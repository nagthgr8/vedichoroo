import { Injectable } from '@angular/core';
import Peer from 'peerjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import './call-info';

@Injectable()
export class CallService {

    private peer: Peer;
    private mediaCall: Peer.MediaConnection;
	conn1: any;
	conn2: any;
    trcinfo: string = '';
    private localStreamBs: BehaviorSubject<MediaStream> = new BehaviorSubject(null);
    public localStream$ = this.localStreamBs.asObservable();
    private remoteStreamBs: BehaviorSubject<MediaStream> = new BehaviorSubject(null);
    public remoteStream$ = this.remoteStreamBs.asObservable();

    private isCallStartedBs = new Subject<boolean>();
    public isCallStarted$ = this.isCallStartedBs.asObservable();

    private isCallClosedBs = new Subject<boolean>();
    public isCallClosed$ = this.isCallClosedBs.asObservable();

    private isCallAnsweredBs = new Subject<boolean>();
    public isCallAnswered$ = this.isCallAnsweredBs.asObservable();

    private isConnectedBs = new Subject<string>();
    public isConnected$ = this.isConnectedBs.asObservable();
	
    private msgRecvedBs = new Subject<string>();
    public msgRecved$ = this.msgRecvedBs.asObservable();


    constructor() { 
	
	}
	public initPeer(): string {
        if (!this.peer || this.peer.disconnected) {
            const peerJsOptions: Peer.PeerJSOption = {
                debug: 3,
                config: {
                    iceServers: [
                        {
                            urls: [
                                'stun:stun1.l.google.com:19302',
                                'stun:stun2.l.google.com:19302',
                            ],
                        }]
                }
            };
            try {
                let id = uuidv4();
                this.peer = new Peer(id, peerJsOptions);
                return id;
            } catch (error) {
                console.error(error);
            }
        }
    }
	public async establishMediaCall(dob: string, remotePeerId: string, iscall: boolean) {
        try {
			console.log('estMediaCall getting user media');
			this.addLog('estMediaCall getting user media');
            const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
            console.log('estMediaCall connecting peer', remotePeerId);
			this.addLog('connecting to ' + remotePeerId);
            this.conn1 = this.peer.connect(remotePeerId, {metadata: {dob: dob}});
            this.conn1.on('error', err => {
				this.addLog('eeror ' + JSON.stringify(err));
                console.error(err);
            });
            console.log('estMediaCall connected', this.conn1);
			this.addLog('connected to ' + remotePeerId);
			this.isConnectedBs.next('connected to ' + remotePeerId);
            console.log('estMediaCall calling peer', remotePeerId);
			if(iscall) {
				this.mediaCall = this.peer.call(remotePeerId, stream);
				if (!this.mediaCall) {
					let errorMessage = 'Unable to connect to remote peer';
					throw new Error(errorMessage);
				}
				this.localStreamBs.next(stream);
				console.log('establishMediaCall', 'callstarted');
				this.isCallStartedBs.next(true);

				this.mediaCall.on('stream',
					(remoteStream) => {
						this.remoteStreamBs.next(remoteStream);
					});
				this.mediaCall.on('error', err => {
					console.error(err);
					this.isCallStartedBs.next(false);
				});
				this.mediaCall.on('close', () => this.onCallClose());
			}
			this.conn1.oniceconnectionstatechange = (ev: Event) => {
					console.log('RTCPeerConnection ICE state change', JSON.stringify(ev));
				if (this.conn1.iceconnectionstate === "failed" ||
					  this.conn1.iceconnectionstate === "disconnected" ||
					  this.conn1.iceconnectionstate === "closed") {		
							this.onCallClose();
					  }
			}
			this.conn1.on('open', () => {
				this.addLog('connection opened successfully');
				this.isConnectedBs.next('connection opened successfully' );
				this.conn1.on('data', (data) => {
						console.log('Received from conn2', data);
						this.isConnectedBs.next('received ' + data);
						this.addLog('received ' + data);
						if(data == 'call-accepted') {
							this.isCallAnsweredBs.next(true);
						}
						else if(data =='call-ended') {
							//this.closeMediaCall();
							//this.destroyPeer();
						} else if(data == 'call-cancelled'){
							this.onCallClose();
						} else {
							this.addLog('sending msgRecved event ');
							this.isConnectedBs.next('sending msgRecved event' );
							this.msgRecvedBs.next(data);
						}
				});			
			});
			this.conn1.on('close', () => {
				this.onCallClose();
			});
        }
        catch (ex) {
            console.error(ex);
            this.isCallStartedBs.next(false);
        }
    }
	public async enableCallAnswer() {
        try {
			 console.log('enableCallAnswer connecting peer');
			 this.peer.on('connection', (conn) => {
					console.log('peer-connected', conn);
					console.log('metadata', conn['metadata'].dob);
					this.conn2 = conn;
			//	this.conn2.on('open', () => {
			//		console.log('peer-open');
			//  });
				this.conn2.oniceconnectionstatechange = (ev: Event) => {
					console.log('RTCPeerConnection ICE state change', JSON.stringify(ev));
					if (this.conn2.iceconnectionstate === "failed" ||
					  this.conn2.iceconnectionstate === "disconnected" ||
					  this.conn2.iceconnectionstate === "closed") {		
							this.onCallClose();
					}
				}
				this.conn2.on('close', () => {
					this.onCallClose();
				});
				  this.conn2.on('data', (data) => {
					console.log('Received from conn1', data);
					if(data =='call-ended') {
						//this.closeMediaCall();
						//this.destroyPeer();
					}  else if(data == 'call-cancelled'){
							this.onCallClose();
					}else {
						this.msgRecvedBs.next(data);
					}
				});			
			});
			this.peer.on('close', () => this.onCallClose());
			this.peer.on('disconnected', () => this.onCallClose());
			console.log('enableCallAnswer listening to peer calls');
            this.peer.on('call', async (call) => {
			console.log('enableCallAnswer received call');
              this.mediaCall = call;
			  console.log('enableCallAnswer getting user media');
			  navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
				this.localStreamBs.next(stream);
                console.log('on-call', call);
                this.isCallStartedBs.next(true);
				this.isCallAnswered$
				.subscribe(res => {
					console.log('isCallAnswered$ triggered at call.service');
					this.mediaCall.answer(stream);
				});
                this.mediaCall.on('stream', (remoteStream) => {
                    this.remoteStreamBs.next(remoteStream);
                });
                this.mediaCall.on('error', err => {
                    this.isCallStartedBs.next(false);
                    console.error(err);
                });
                this.mediaCall.on('close', () => this.onCallClose());
                this.mediaCall.on('disconnected', () => this.onCallClose());
            });
		  });
        }
        catch (ex) {
            console.error(ex);
            this.isCallStartedBs.next(false);
        }
		
    }
	public getCallerName() {
		let dob: string = this.conn2['metadata'].dob;
		if(dob.indexOf('#') > -1) {
				var ng = dob.split('#')[1];
				return ng.split('&')[0];
		} else return 'Unknown User';
		
}
	public cancelCall(iscaller) {
       this.isCallStartedBs.next(false);
	   this.isCallClosedBs.next(true);
	   if(iscaller) {
		  this.conn1?.close();
	   } else {
		  this.conn2?.close();
	   }
	}
	public closeConnection(iscaller) {
		if(iscaller) this.conn1.close();
		else this.conn2.close();
		this.onCallClose();
	}
    private onCallClose() {
		this.isCallClosedBs.next(true);
        this.remoteStreamBs?.value.getTracks().forEach(track => {
            track.stop();
        });
        this.localStreamBs?.value.getTracks().forEach(track => {
            track.stop();
        });
    }

    public closeMediaCall() {
        this.mediaCall?.close();
        if (!this.mediaCall) {
            this.onCallClose()
        }
        this.isCallStartedBs.next(false);
    }

    public destroyPeer() {
        this.mediaCall?.close();
        this.peer?.disconnect();
        this.peer?.destroy();
    }
	public getConnMetadata() {
		console.log('meta', this.conn2?.metadata);
		return this.conn2?.metadata;
	}
    public sendMsg(msg, iscaller) {
		if(msg == 'call-accepted') {
			this.isCallAnsweredBs.next(true);
		}		
		if(iscaller) {
			    console.log('conn1', this.conn1);
				console.log('conn1 sending', msg);
				this.addLog('sending  ' + msg);
				this.conn1.send(msg);
				console.log('conn1 sent', msg);
				this.addLog('msg sent');
				if(msg =='call-ended') {
					this.closeMediaCall();
				}
		}
		else {
			    console.log('conn2', this.conn2);
				console.log('conn2 sending', msg);
				this.conn2.send(msg);
				console.log('conn2 sent', msg);
				if(msg =='call-ended') {
					this.closeMediaCall();
				}
		}
	}		
	public addLog(log) { this.trcinfo += log + "\n"; }
	public getLog() {return this.trcinfo }
 }
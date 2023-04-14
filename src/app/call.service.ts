import { NgZone, Injectable, EventEmitter } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HoroscopeService } from './horoscope.service';
import { ShareService } from './share.service';
import { User } from './user';
import './call-info';
declare var Peer:any;
let alertDisplayed = false;
export const astroStatus = new EventEmitter<any>();
export const astroCallStatus = new EventEmitter<any>();
var socket = io('https://ast.vedichoroo.com');	
socket.on("connect_error", (error) => {
  console.log("Socket connection error:", error);
  if(!alertDisplayed) { alert("Sorry, we're having trouble connecting to our servers right now. This could be due to a server issue or a firewall/network configuration issue. Please check your internet connection, firewall settings, and try again. If the issue persists, please report it to info@vedichoroo.com.");
	alertDisplayed = true;
  }
});
socket.on('astrologer-status', (ast) => {
	console.log('astrologer-status', ast);
	astroStatus.emit(ast); 
});	
socket.on("error", (error) => {
  console.log("Socket error:", error);
});
declare var dataConnection: any;
const peerConfig = {
	 iceServers: [
		{
		  urls: "stun:openrelay.metered.ca:80",
		},
		{
		  urls: "turn:openrelay.metered.ca:80",
		  username: "openrelayproject",
		  credential: "openrelayproject",
		},
		{
		  urls: "turn:openrelay.metered.ca:443",
		  username: "openrelayproject",
		  credential: "openrelayproject",
		},
		{
		  urls: "turn:openrelay.metered.ca:443?transport=tcp",
		  username: "openrelayproject",
		  credential: "openrelayproject",
		},
	  ]
	};
            var peerJsOptions = {
                debug: 3,
                config: {
				 iceServers: [
					{
					  urls: "stun:openrelay.metered.ca:80",
					},
					{
					  urls: "turn:openrelay.metered.ca:80",
					  username: "openrelayproject",
					  credential: "openrelayproject",
					},
					{
					  urls: "turn:openrelay.metered.ca:443",
					  username: "openrelayproject",
					  credential: "openrelayproject",
					},
					{
					  urls: "turn:openrelay.metered.ca:443?transport=tcp",
					  username: "openrelayproject",
					  credential: "openrelayproject",
					},
				  ]
			 }		 
            };
@Injectable()
export class CallService {

    peer;
	peerConnection;
    mediaCall;
	ringer = new Audio('assets/sounds/ringer.mp3');
	callStarted = new EventEmitter<any>();
    callEnded = new EventEmitter();	
	private astroCallStartedSource = new BehaviorSubject<MediaStream>(null);
	astroCallStarted$ = this.astroCallStartedSource.asObservable();
	serverErrorDisplayed: boolean = false;
	stream: any;
	//private endCallSource = new Subject<void>();
	//public endCall$ = this.endCallSource.asObservable();
	isConnected: boolean = false;
	isCallEnded: boolean = false;
	isIceCandidateSent: boolean = false;
    pinf: any = {};
    constructor(private zone: NgZone, private shareService: ShareService, private horoService: HoroscopeService) { 
		socket.on('astro-call-status', (ast) => {
		  console.log('astro-call-status', ast);
		  astroCallStatus.emit(ast); 
		  if (this.peer) {			
			this.shareService.getItem('user').then((usr: User) => {
			  if (usr.email === ast.aid && ast.busy === false && this.peer.isConnected()) {
				this.peerConnection?.close();
			  }
			});
		  }
		});	
	}
	public async initPeer(uid, isast): Promise<any> {
	   console.log('InitPeer');
	    return new Promise((resolve, reject) => {
			if (!this.peer || this.peer.disconnected) {
				this.establishMediaCall().then((stream) => {
					console.log('establishMediaCall', this.stream);
					let id = uuidv4();
					this.peer = new Peer(id, peerJsOptions);
					console.log('peer.on.open', this.peer);
					this.peer.on('open', () => {
						console.log('Peer connection opened with ID:', this.peer.id);
						if(!isast) {
							socket.emit('signin', uid);
						}
						console.log('peer resolved', this.peer);
						resolve(this.peer);
					});
					console.log('peer.on.error');
					this.peer.on('error', (err) => {
						console.error('Error occurred with peer connection:', err);
						reject(err);
					});
					
				}, (error) => {
					//error establishMediaCall
					console.log('error getting audio device: ', error);
					reject(error);
				});
			} else {
				console.log('Peer already created');
				reject('Peer already created');
			}
		});
    }
public async establishMediaCall(): Promise<MediaStream> {
  try {
    // Call getUserMedia with audio constraints and immediately stop the stream
	console.log('calling getUserMedia...');
    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
	console.log('stopping tracks..');
    audioStream.getTracks().forEach(track => track.stop());
    console.log('tracks stopped.');
    // Call enumerateDevices to get a list of available audio devices
	console.log('calling enumerateDevices..');
    const devices = await navigator.mediaDevices.enumerateDevices();
	console.log('enumerateDevices: ', devices);
    const audioDevices = devices.filter(device => device.kind === 'audiooutput');

    // Determine the device to use (based on user selection or default)
    const defaultDevice = audioDevices.find(device => device.deviceId === 'default');
    const selectedDevice = audioDevices.find(device => device.deviceId === localStorage.getItem('selectedDeviceId'));
    const deviceId = selectedDevice ? selectedDevice.deviceId : defaultDevice ? defaultDevice.deviceId : null;

    // Call getUserMedia with the selected device and return the stream
    const constraints = { audio: { deviceId } };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    this.stream = stream;
    const audioTracks = this.stream.getAudioTracks();
    if (audioTracks.length === 0) {
      console.error('getUserMedia returned a MediaStream without any audio tracks');
      alert("Sorry, we're unable to access your audio right now. Please check your audio settings and ensure that your microphone is connected properly. If the issue persists, try refreshing the page or contact our support team for assistance.");
      throw new Error('No audio tracks');
    }
    return stream;
  } catch (getUserMediaError) {
    console.log('Error in establishMediaCall:', getUserMediaError);
    throw getUserMediaError;
  }
}
   handleIceCandidateEvent(event, uid, iscaller) {
    console.log('this.peerConnection icecandidate', event);
    if (event.candidate && !this.isIceCandidateSent) {
      // Send the ICE candidate to the remote peer using your signaling mechanism
      // (such as a WebSocket or HTTP POST request)
      socket.emit('icecandidate', { to: uid, iscaller: iscaller, candidate: event.candidate }, () => {
        // The callback function is executed after the 'icecandidate' message is successfully sent
        console.log('ICE candidate sent to peer');
      });

      // Set the flag to true to prevent sending additional ice candidates
      this.isIceCandidateSent = true;
    }
  }
    async callAstro(aid: string, name: string, apic: string, cid: string, dob: string, pic: string) {
	   try {
	    console.log('callAstro-aid', aid);
		console.log('callAstro-pic', pic);
		// Create new peer connection
		this.peerConnection = new RTCPeerConnection(peerConfig);

		const audioTrack = this.stream.getAudioTracks()[0];
		console.log('Audio track:', audioTrack);
		// Add local audio stream to peer connection
		this.stream.getTracks().forEach(track => this.peerConnection.addTrack(track, this.stream));
		
		// Listen for ICE candidates and send them to the remote peer
		this.peerConnection.addEventListener('icecandidate', event => this.handleIceCandidateEvent(event, aid, true));
		// Play audio from remote peer when received
		console.log('listinging for audio from remote peer...');
		this.peerConnection.addEventListener('track', event => {
		    console.log('Playing the remote peer audio', event);
			this.astroCallStartedSource.next(event.streams[0]);
		});		
		
		// Create offer and set as local description
		console.log('creating offer');
		const offer = await this.peerConnection.createOffer();
		await this.peerConnection.setLocalDescription(offer);
		console.log('Ringing...');
		this.ringer.play();
		// Display calling message
		const outgoingCallAlert = document.createElement('div');
		outgoingCallAlert.innerHTML = `<p>Great! We're connecting you with ${name}. Hang tight, they'll be with you shortly!</p><button class="cancel-btn">Cancel</button>`;
		//this.renderer.addClass(outgoingCallAlert, 'outgoing-call-alert');
		const header = document.querySelector('body > #call-msg');
		console.log('querySelector(#call-msg)', header);
		header.appendChild(outgoingCallAlert);
		const ele = document.getElementById('call-msg');
		ele.style.display = 'inline-block';
		// Add event listeners to accept and reject call
		console.log('querySelector(.cancel-btn)', outgoingCallAlert.querySelector('.cancel-btn'))
		outgoingCallAlert.querySelector('.cancel-btn').addEventListener('click', () => {
			  // Stop the ringtone
		  this.ringer.pause();
			  // Remove the incoming call alert
		  header.removeChild(outgoingCallAlert);
		  ele.style.display = 'none';
		});

		console.log('Sending offer to astrologer', aid);
		socket.emit('offer', {cid, aid, offer});
    
		console.log('waiting for answer..');
		socket.on('answer', async ({peerid, answer}) => {
		    console.log('answer received', peerid);
		    this.ringer.pause();
			header.removeChild(outgoingCallAlert);
			ele.style.display = 'none';
			await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
			  socket.emit('peerData', {
				id: socket.id,
				username: aid
			  });	
            console.log('peer-connect:', dob);
			console.log('peer-connect:', pic);
			this.peer.connect(peerid, {metadata: {dob: dob, pic: pic}});
			const usr: any = { cid: cid, is_caller: true, aid: aid, pic: apic };
			this.callStarted.emit(usr);
		});
		// Listen for remote ICE candidates and add them to the peer connection
		console.log('listening from remote ice-candidate');
		socket.on('icecandidate', async (event) => {
		    console.log('socket.on remote ice-candidate', event);
			await this.peerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
		});
		console.log('on-reject');
		socket.on('reject', () => {
			this.ringer.pause();
			outgoingCallAlert.innerHTML = `<p>Hello, I'm sorry to inform you that your call with the astrologer has been rejected. Please don't worry, we are here to help and support you. There could be many reasons why the call was rejected, and we want to make sure that you feel comfortable and heard. If you would like to reschedule the call or have any questions, please feel free to contact us anytime. Thank you for choosing our service and we look forward to serving you again soon.</p><button class="cancel-btn">Close</button>`;
			outgoingCallAlert.querySelector('.cancel-btn').addEventListener('click', () => {
				header.removeChild(outgoingCallAlert);
				ele.style.display = 'none';
			});
		});

		console.log('on-disconnect');
		socket.on('disconnect', () => {
		    console.log('call disconnected');
			//this.callEnded.emit();
			//this.stream.getTracks().forEach(track => track.stop());
		});
       this.peer.on('connection', (conn) => {
         console.log('peer connected', conn);
         conn.on('data', (data) => {
             const message = JSON.parse(data);
           if (message.type == 'broadcast-message') {
             astroStatus.emit({ aid: message.data.aid, busy: message.data.busy, available: message.data.available });
             }
         });
       });	
		console.log('Local streams:', this.peerConnection.getSenders().map(sender => sender.track));
		console.log('Remote streams:', this.peerConnection.getReceivers().map(receiver => receiver.track));
	   } catch (error) {
			this.ringer.pause();
			alert('Sorry, we are unable to connect you at the moment. Our server may be down. Please try again later. If the issue persists, please report it to info@vedichoroo.com');
	    if (error.message === 'xhr poll error' || error.message === 'transport close') {
			console.log('callAstro: SocketError', error.message);
		} else {
			console.log('callAstro: Error', JSON.stringify(error));
		}
	   }
	}

	listenToCalls(aid: string, peerid: string) {
	try {
		if (!socket.connected) {
			throw new Error('Unable to connect to the server. Please try again later.');
		}

    let sno: any = {'aid': aid, 'peerid': peerid};
    socket.emit('astrologer-sign-in', sno);
    astroStatus.emit({aid: aid, busy: false, available: true});

    console.log('waiting for offer', socket);
    socket.on('offer', async ({cid, customerSocketId, offer}) => {
	    console.log('offer received');
		console.log('cid', cid);
		console.log('customerSocketId', customerSocketId);
		console.log('offer', offer);
	    console.log('calling RTCPeerConnection');
		this.peerConnection = new RTCPeerConnection(peerConfig);
		const audioTrack = this.stream.getAudioTracks()[0];
		console.log('Audio track:', audioTrack);

		console.log('getTracks', this.stream);
		this.stream.getTracks().forEach(track => this.peerConnection.addTrack(track, this.stream));
        this.peerConnection.addEventListener('icecandidate', event => this.handleIceCandidateEvent(event, cid, false));
		// this.peerConnection.addEventListener('icecandidate', event => {
			  // console.log('this.peerConnection icecandidate', event)
			  // if (event.candidate) {
				//Send the ICE candidate to the remote peer using your signaling mechanism
				//(such as a WebSocket or HTTP POST request)
				// socket.emit('icecandidate', { to: cid, iscaller: false, candidate: event.candidate });
			  // }
		// });

		// Play audio from remote peer when received
		console.log('listinging for audio from remote peer...');
		this.peerConnection.addEventListener('track', event => {
			console.log('Playing the remote peer audio', event);
			this.astroCallStartedSource.next(event.streams[0]);
		});		

		// Handle incoming ICE candidates from the remote peer
		socket.on('icecandidate', async (event) => {
		  console.log('socket.on icecandidate', event)
		  if (this.peerConnection.remoteDescription) {
			  const candidate = new RTCIceCandidate(event.candidate);
			  await this.peerConnection.addIceCandidate(candidate);
			  console.log('Remote description is set');
		  } else {
			  console.log('Remote description is not set yet');
		  }		  
		});		
		console.log('Local streams:', this.peerConnection.getSenders().map(sender => sender.track));
		console.log('Remote streams:', this.peerConnection.getReceivers().map(receiver => receiver.track));
      //console.log('offer received!');
      this.ringer.play();

      const incomingCallAlert = document.createElement('div');
      incomingCallAlert.innerHTML = `
        <p>There is Incoming call. Please answer.</p>
        <button class="accept-call-btn">Accept</button>
        <button class="reject-call-btn">Reject</button>
      `;

      const header = document.querySelector('body > #call-msg');
      console.log('querySelector(body > #call-msg)', header);
      header.appendChild(incomingCallAlert);
      const ele = document.getElementById('call-msg');
      ele.style.display = 'inline-block';

      await new Promise(resolve => {
        incomingCallAlert.querySelector('.accept-call-btn').addEventListener('click', async () => {
          this.ringer.pause();
          header.removeChild(incomingCallAlert);
          ele.style.display = 'none';

          const usr: any = { cid: cid, is_caller: false, aid: aid, pic: 'https://i.imgur.com/LR7e1vw.png' };

          try {
            // Set remote description
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

            // Create answer
            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);
            console.log('sending answer', answer);
            socket.emit('answer', ({aid, cid, answer}));
            this.callStarted.emit(usr);
          } catch (err) {
            console.error('Failed to create answer:', err);
          }
        });

        incomingCallAlert.querySelector('.reject-call-btn').addEventListener('click', () => {
          this.ringer.pause();
          console.log('emitting rejected');
          socket.emit('call-response', {aid: aid, cid: cid, response: 'rejected'});
          header.removeChild(incomingCallAlert);
          ele.style.display = 'none';
        });
      });
    });	
		console.log('peer-on-connection', this.peer);
		this.peer.on('connection', (conn) => {
		  console.log('connected to user', conn);
			  this.pinf.dob = conn.metadata.dob;
			  this.pinf.pic = conn.metadata.pic;
		  conn.on('data', (data) => {
        const message = JSON.parse(data);
        if (message.type == 'broadcast-message') {
          astroStatus.emit({ aid: message.data.aid, busy: message.data.busy, available: message.data.available});
        }
		  });
		});	
	    socket.on('connect', () => {
		  console.log('call connected at astrologer');
		  this.isConnected = true;
		  let sno: any = {'aid': aid, 'peerid': peerid};
		  socket.emit('astrologer-sign-in', sno);
		  astroStatus.emit({aid: aid, busy: false, available: true});
		});        
		console.log('socket-on-disconnect');		
		socket.on('disconnect', () => {
		    console.log('call disconnected at astrologer');
			//this.endCallSource.next();
			//this.stream.getTracks().forEach(track => track.stop());
			this.isConnected = false;
		});
		console.log('listenToCalls-setup-complete');
	  } catch(error) {
	    console.log('listenToCalls: Error', JSON.stringify(error));
		    if (!this.serverErrorDisplayed) {
				this.serverErrorDisplayed = true;
				alert('Unable to connect to the server. Please try logging in after sometime. If the issue persists, please report the error to info@vedichoroo.com');
			}
		
		if(!this.isConnected) {
			setTimeout(() => this.listenToCalls(aid, peerid), 5000);
		}
	  }
	}
	sendCallMetadata(aid, metadata) {
	   if(!dataConnection) {
			dataConnection = this.peer.connect(aid);
		}
		dataConnection.on('open', () => {
			dataConnection.send(metadata);
		});
	}
	endCall(iscaller, aid) {
	   console.log('endCall', aid);
	   this.peerConnection?.getSenders().forEach(sender => {
			const track = sender.track;
			if (track) {
				track.stop();
			}
		});
	  this.peerConnection?.close();
	  if(!iscaller) socket.emit('call-status', {aid: aid, busy: false});
	  if (!this.isCallEnded) {
		//socket.broadcast.emit('astrologer-status', {aid: aid, busy: false, available: true});
		this.isCallEnded = true;
	  }
	  this.horoService.getActivePeers().subscribe((activePeers) => {
	   for (const activePeer of activePeers) {
			const conn = this.peer.connect(activePeer.peerId);
			const message = { type: 'broadcast-message', data: {aid: aid, busy: false, available: true}};
			conn.on('open', () => {
			  // Send the broadcast message to the peer
			  conn.send(JSON.stringify(message));
			});
			conn.on('error', (err) => {
				console.error('Error sending message to peer:', err);
			});
		  }	 
	  });
  }
  stopTracks() {
    this.callEnded.emit();
    this.peerConnection?.getSenders().forEach(sender => {
      const track = sender.track;
      if (track) {
        track.stop();
      }
    });
   if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }
  disconnect(aid) {
    socket?.disconnect();
    this.stopTracks();
    this.horoService.getActivePeers().subscribe((activePeers) => {
      for (const activePeer of activePeers) {
        const conn = this.peer.connect(activePeer.peerId);
        const message = { type: 'broadcast-message', data: { aid: aid, busy: false, available: false } };
        conn.on('open', () => {
          // Send the broadcast message to the peer
          conn.send(JSON.stringify(message));
        });
        conn.on('error', (err) => {
          console.error('Error sending message to peer:', err);
        });
      }
    });
  }
    public getPeerInfo() {return this.pinf; }
	public muteMic() {}
	//public addLog(log) { this.trcinfo += log + "\n"; }
	//public getLog() {return this.trcinfo }
 }

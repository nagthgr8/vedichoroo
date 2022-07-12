
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
(window as any) ['global'] = window;
(window as any).global = window;
(window as any).process = window;
(window as any).process.browser = true;
(window as any).process.version = '';
(window as any).process.versions = {node: false};
global.Buffer = global.Buffer || require('buffer').Buffer;
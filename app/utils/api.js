import * as firebase from 'firebase';

export function reauthenticate (password) {
    const user = firebase.auth().currentUser;

    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    );

    return user.reauthenticateWithCredential(credentials);
} 


// API KEY: AIzaSyD031BZLZyy0VY9fOlQ4rUxaGxPCbKC7-w


// Google Certificate Fingerprint:     E1:0D:FC:0F:8A:DC:A1:22:DE:25:71:D1:AE:BE:D5:A7:14:67:79:59
// Google Certificate Hash (SHA-1):    E10DFC0F8ADCA122DE2571D1AEBED5A714677959
// Google Certificate Hash (SHA-256):  22F33A1F37CF4D82E38B7AC8D006E59A05661D0DB32D30405F81AF9A55B4428F
// Facebook Key Hash:                  4Q38D4rcoSLeJXHRrr7VpxRneVk=
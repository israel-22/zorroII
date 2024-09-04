import { Injectable } from '@angular/core';
import { 
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UsersService, LoginInfo } from '../users/users.service';
import { UserCredential } from '@angular/fire/auth';

export interface Register {
  uid: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  photoURL: string;
  role: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
currentRegister?: Register;
  constructor(private firestore: Firestore, private usersService: UsersService) { }

  getRegisters(): Observable<Register[]> {
    const registersRef = collection(this.firestore, 'registers');
    return collectionData(registersRef, {idField: 'uid'});
  }

  getRegister(uid: string): Observable<Register> {
    const docRef = doc(this.firestore, `registers/${uid}`);
    return collectionData(docRef, {idField: 'uid'});
  }

  async createRegistro(LoginInfo: LoginInfo,{email, nickname, phoneNumber, photoURL}: Register) : Promise<any> {
const userCredential: UserCredential = await this.usersService.register(LoginInfo )
  .catch((error) => {
    console.log(error);
    return error;
  }); 

  const uid = userCredential.user.uid;
  this.currentRegister = {uid, email, nickname, phoneNumber, photoURL, role: "empleado"};
    const registersRef = collection(this.firestore, 'registers');
    return addDoc(registersRef, {email, nickname, phoneNumber, photoURL});
  }
  async createRegisterWithGoogle() : Promise<any> {
    const userCredential: UserCredential = await this.usersService.loginWithGoogle()
    .catch((error) => {
      console.log(error);
      return error;
    }); 
    const uid = userCredential.user.uid;
    const photoURL = userCredential.user.photoURL!;
    const email = userCredential.user.email!;  
    const nickname = userCredential.user.displayName!;
    const phoneNumber = userCredential.user.phoneNumber!;
    const role= "empleado";
    this.currentRegister = {uid, email, nickname, phoneNumber, photoURL, role};
    const registersRef = collection(this.firestore, 'registers');
    return addDoc(registersRef, {email, nickname, phoneNumber, photoURL});
  }

  // setRegister(register: Register):void {
  //   this.currentRegister = register;
  // }

  // updateRegistro(register: Register) : Promise<any> {


  //   const registersRef = doc(this.firestore, registers/${register.uid});
  //   return updateDoc(registersRef, {title: register.title, completed: register.completed});
  // }

  // deleteRegistro(register: Register) : Promise<any> {
  //   const docRef = doc(this.firestore, registers/${register.uid});
  //   return deleteDoc(docRef);
  // }
}
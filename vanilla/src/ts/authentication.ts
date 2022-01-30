import { updateProfile, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import './initializeApp';
import 'firebaseui';

const auth = getAuth();

const containerForms: any = document.querySelector('.forms');
const signInForm: any = document.querySelector('.form-auth__sign-in');
const signUpForm: any = document.querySelector('.form-auth__sign-up');
const backDrop: any = document.querySelector('.backgroundDrop');
const userName: any = document.querySelector('.user-name');
const loginBtn: any = document.querySelector('.loginBtn');
const logoutBtn: any = document.querySelector('.logoutBtn');

containerForms.addEventListener('click', clickHandler);
loginBtn.addEventListener('click', clickHandler);
logoutBtn.addEventListener('click', clickHandler);
backDrop.addEventListener('click', clickHandler);
signInForm.addEventListener('submit', (e: any) => signIn(e));
signUpForm.addEventListener('submit', (e: any) => signUp(e));
signInForm.addEventListener('reset', () => openCloseForm('close'));
signUpForm.addEventListener('reset', () => openCloseForm('close'));

/**
 * Сlick handler.
 * @param {} event Event - 'click'.
 */
function clickHandler(event: any): void {
  const { type } = event.target.dataset;
  if (type === 'close') {
    openCloseForm(type);
  }
  if (type === 'open-sign-up') {
    openCloseForm(type);
  }
  if (type === 'open-sign-in') {
    openCloseForm(type);
  }
  if (type === 'sign-out') {
    signOut(auth);
  }
}

onAuthStateChanged(auth, user => {
  if (user) {
    redactorUserNameHTML(user.displayName);
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
  } else {
    redactorUserNameHTML('');
    openCloseForm('open-sign-in');
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
  }
});

/**
 * Sign In.
 * Sign in a user, login change in HTML.
 * @param {} e Event - submit form "sign in".
 */
function signIn(e: any): void {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      redactorUserNameHTML(userCredential.user.displayName);
      openCloseForm('close');
    })
    .catch(error => {
      const errorMessage = error.message;
      // eslint-disable-next-line no-alert
      alert(errorMessage);
    });
}

/**
 * Sign Up.
 * Sign up a user, add displayName in Firebase, login change in HTML.
 * @param {} e Event - submit form "sign up".
 */
function signUp(e: any): void {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  const name = e.target.userName.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const { user } = userCredential;
      updateProfile(user, {
        displayName: name,
      });
      redactorUserNameHTML(name);
      openCloseForm('close');
    });
}

/**
 * Redactor user name HTML.
 * @param {} loginName Data entered by the user in input.
 */
function redactorUserNameHTML(loginName: any): void {
  userName.textContent = loginName;
}

/**
 * Open or close form.
 * Open or close form on click.
 * @param {} type Type of event ('open-sign-in','open-sign-up','close').
 */
function openCloseForm(type: any): void {
  if (type === 'open-sign-in') {
    signUpForm.classList.remove('open');
    signInForm.classList.add('open');
    backDrop.classList.add('open');
  }
  if (type === 'open-sign-up') {
    signUpForm.classList.add('open');
    signInForm.classList.remove('open');
    backDrop.classList.add('open');
  }
  if (type === 'close') {
    signUpForm.classList.remove('open');
    signInForm.classList.remove('open');
    backDrop.classList.remove('open');
  }
}
import { updateProfile, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import './initializeApp';
import 'firebaseui';

const auth = getAuth();

const containerForms = document.querySelector<HTMLDivElement>('.forms');
const signInForm = document.querySelector<HTMLFormElement>('.form-sign-in');
const signUpForm = document.querySelector<HTMLFormElement>('.form-sign-up');
const backDrop = document.querySelector<HTMLDivElement>('.backgroundDrop');
const userName = document.querySelector<HTMLHtmlElement>('.user-name');
const loginButton = document.querySelector<HTMLButtonElement>('.login-button');
const logoutButton = document.querySelector<HTMLButtonElement>('.logout-button');
const errorSignInForm = signInForm?.querySelector<HTMLHtmlElement>('.error');
const errorSignUpForm = signUpForm?.querySelector<HTMLHtmlElement>('.error');

containerForms?.addEventListener('click', clickHandler);
loginButton?.addEventListener('click', clickHandler);
logoutButton?.addEventListener('click', clickHandler);
backDrop?.addEventListener('click', clickHandler);
signInForm?.addEventListener('submit', (e: Event) => signIn(e));
signUpForm?.addEventListener('submit', (e: Event) => signUp(e));
signInForm?.addEventListener('reset', () => openCloseForm('close'));
signUpForm?.addEventListener('reset', () => openCloseForm('close'));

/**
 * Сlick handler.
 * @param event Event - 'click'.
 */
function clickHandler(event: Event): void {
  const { type } = (event.target as HTMLButtonElement).dataset;
  if (type === 'sign-out') {
    signOut(auth);
  } else {
    openCloseForm(type);
  }
}

onAuthStateChanged(auth, user => {
  if (user) {
    updateDisplayUserName(user.displayName);
    if (loginButton && logoutButton) {
      loginButton.style.display = 'none';
      logoutButton.style.display = 'block';
    }
  } else {
    updateDisplayUserName('');
    openCloseForm('open-sign-in');
    if (loginButton && logoutButton) {
      loginButton.style.display = 'block';
      logoutButton.style.display = 'none';
    }
  }
});

/**
 * Sign In.
 * Sign in a user, login change in HTML.
 * @param e Event - submit form "sign in".
 */
function signIn(e: Event): void {
  e.preventDefault();
  const email = (e.target as HTMLFormElement).email.value;
  const password = (e.target as HTMLFormElement).password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      updateDisplayUserName(userCredential.user.displayName);
      openCloseForm('close');
      setError(errorSignInForm, '');
    })
    .catch(error => {
      const errorMessage = error.message;
      setError(errorSignInForm, errorMessage);
    });
}

/**
 * Sign Up.
 * Sign up a user, add displayName in Firebase, login change in HTML.
 * @param e Event - submit form "sign up".
 */
function signUp(e: Event): void {
  e.preventDefault();
  const email = (e.target as HTMLFormElement).email.value;
  const password = (e.target as HTMLFormElement).password.value;
  const name = (e.target as HTMLFormElement).userName.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const { user } = userCredential;
      updateProfile(user, {
        displayName: name,
      });
      updateDisplayUserName(name);
      openCloseForm('close');
      setError(errorSignUpForm, '');
    })
    .catch(error => {
      const errorMessage = error.message;
      setError(errorSignUpForm, errorMessage);
    });
}

/**
 * Redactor user name HTML.
 * @param loginName Data entered by the user in input.
 */
function updateDisplayUserName(loginName: string | null): void {
  (userName as HTMLHtmlElement).textContent = loginName;

}

/**
 * Redactor error message HTML.
 * @param element Element error.
 * @param errorMessage Error message.
 */
function setError(element: HTMLHtmlElement | null | undefined, errorMessage: string | null): void {
  if (element) {
    (element as HTMLHtmlElement).textContent = errorMessage;
  }
}

/**
 * Open or close form.
 * Open or close form on click.
 * @param type Type of event ('open-sign-in','open-sign-up','close').
 */
function openCloseForm(type: string | undefined): void {
  switch (type) {
    case 'open-sign-in':
      signUpForm?.classList.remove('open');
      signInForm?.classList.add('open');
      backDrop?.classList.add('open');
      break;
    case 'open-sign-up':
      signUpForm?.classList.add('open');
      signInForm?.classList.remove('open');
      backDrop?.classList.add('open');
      break;
    case 'close':
      signUpForm?.classList.remove('open');
      signInForm?.classList.remove('open');
      backDrop?.classList.remove('open');
      signUpForm?.reset();
      signInForm?.reset();
      setError(errorSignUpForm, '');
      setError(errorSignInForm, '');
      break;
    default:
      break;
  }
}

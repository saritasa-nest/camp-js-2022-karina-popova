import { updateProfile, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import './initializeApp';
import 'firebaseui';

const auth = getAuth();

const containerForms = document.querySelector<HTMLDivElement>('.forms');
const signInForm = document.querySelector<HTMLFormElement>('.formAuth__signIn');
const signUpForm = document.querySelector<HTMLFormElement>('.formAuth__signUp');
const backDrop = document.querySelector<HTMLDivElement>('.backgroundDrop');
const userName = document.querySelector<HTMLHtmlElement>('.userName');
const loginBtn = document.querySelector<HTMLButtonElement>('.loginBtn');
const logoutBtn = document.querySelector<HTMLButtonElement>('.logoutBtn');

containerForms?.addEventListener('click', clickHandler);
loginBtn?.addEventListener('click', clickHandler);
logoutBtn?.addEventListener('click', clickHandler);
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
    if (loginBtn && logoutBtn) {
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'block';
    }
  } else {
    updateDisplayUserName('');
    openCloseForm('open-sign-in');
    if (loginBtn && logoutBtn) {
      loginBtn.style.display = 'block';
      logoutBtn.style.display = 'none';
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
      break;
    default:
      break;
  }
}

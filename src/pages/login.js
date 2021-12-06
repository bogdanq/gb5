import { LoginForm } from "../components";
import { firebaseApp } from "../api/firebase";

const onSubmit = (email, password) => {
  return firebaseApp.auth().signInWithEmailAndPassword(email, password);
};

export function LoginPage() {
  return (
    <div>
      <LoginForm submitButton="Вход" title="Вход" onSubmit={onSubmit} />
    </div>
  );
}

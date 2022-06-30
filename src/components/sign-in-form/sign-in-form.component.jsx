import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
    } from '../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';

const defaultFormField = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [candidate, setCandidate] = useState(defaultFormField);
    const { email, password } = candidate;

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const resetFormFields = () => {
        setCandidate(defaultFormField);
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/user-not-found':
                    alert("User with this email not found!");
                    break;
                case 'auth/wrong-password':
                    alert("Password for this user is incorrect!");
                    break;
                default:
                    console.error(error);
                    break;
            }
        }
    }
    const changeHandler = (event) => {
        const { name, value } = event.target;
        const changeState = {
            ...candidate,
            [name]: value
        }
        setCandidate(changeState);
    }
    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={onSubmitHandler}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={changeHandler}
                    name="email"
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={changeHandler}
                    name="password"
                    value={password}
                />
                <div className='buttons-container'>
                    <Button type="submit">
                        Sign In
                    </Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;
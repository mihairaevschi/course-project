import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';
import './sign-up-form.styles.scss';

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [candidate, setCandidate] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = candidate;

    const resetFormFields = () => {
        setCandidate(defaultFormField);
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert("Cannot create user, email already in use!");
            }
            console.error(error);
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
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={onSubmitHandler}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={changeHandler}
                    name='displayName'
                    value={displayName}
                />
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
                <FormInput
                    label="Confirm password"
                    type="password"
                    required
                    onChange={changeHandler}
                    name="confirmPassword"
                    value={confirmPassword}
                />
                <Button
                    type="submit"
                    >
                    Sign Up
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm;
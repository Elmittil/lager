
import { render, fireEvent } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

let auth = {};
const setAuth = (newAuth) => {
    auth = newAuth;
};

const mockSubmit = jest.fn();
const navigation = () => false;

test('testing authfield for login', async () => {
    const title = "Log in"
    const { getAllByText, getByTestId, getByA11yLabel } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
    />);

    //test two elements exist with text 'Log in'
    const titleElemnts = await getAllByText(title);

    expect(titleElemnts.length).toBe(2);

    //test email and password fields exist
    const emailField = await getByTestId("email-field");
    const passwordField = await getByTestId("password-field");

    expect(emailField).toBeDefined();
    expect(passwordField).toBeDefined();

    //test Log in button exists with help of accessibilityLabel
    const a11yLable = `Press to ${title}`;
    const submitButton = getByA11yLabel(a11yLable);

    expect(submitButton).toBeDefined();
    
    //text input in email is saved to auth
    const fakeEmail = "anya@anya.com";
    fireEvent.changeText(emailField, fakeEmail);

    expect(auth?.email).toEqual(fakeEmail);

    //text input in password field is saved to auth
    const fakePassword = "23-iesk";
    fireEvent.changeText(passwordField, fakePassword);

    expect(auth?.password).toEqual(fakePassword);

    fireEvent.press(submitButton);
    expect(mockSubmit).toHaveBeenCalled();
});

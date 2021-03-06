import React from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.white,
  },
  input: {
    height: 50,
  },
  error: {
    height: 20,
    color: Colors.red,
  },
  loginButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
  },
  loginButtonText: {
    color: Colors.white,
  },
  signUpButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  signUpButtonText: {
    color: Colors.accent,
  },
});

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  }

  onChangeEmail = (value) => {
    this.setState({ email: value });
  };

  onChangePassword = (value) => {
    this.setState({ password: value });
  };

  onLoginPress = () => {
    if (!this.validateEmail()) {
      return;
    }

    if (!this.validatePassword()) {
      return;
    }

    const request = new Request('https://api.0llum.de/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    });

    fetch(request)
      .then(response => response.json())
      .then((responseJson) => {
        this.login(responseJson);
      })
      .catch(() => {
        this.setState({
          passwordError: 'Wrong email or password',
        });
      });
  };

  onSignUpPress = () => {
    if (!this.validateEmail()) {
      return;
    }

    if (!this.validatePassword()) {
      return;
    }

    const request = new Request('https://api.0llum.de/users/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    });

    fetch(request)
      .then(response => response.json())
      .then((responseJson) => {
        this.login(responseJson);
      })
      .catch(() => {
        this.setState({
          passwordError: 'Email address already in use. Try to login instead.',
        });
      });
  };

  validateEmail = () => {
    const { email } = this.state;
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || pattern.test(String(email).toLowerCase)) {
      this.setState({
        emailError: 'Please enter a valid email address',
      });
      return false;
    }

    this.setState({
      emailError: '',
    });
    return true;
  };

  validatePassword = () => {
    const { password } = this.state;
    if (!password) {
      this.setState({
        passwordError: 'Please enter a password',
      });
      return false;
    }

    this.setState({
      passwordError: '',
    });
    return true;
  };

  login = (data) => {
    const user = {
      id: data._id,
      email: data.email,
      password: data.password,
      matches: data.matches,
    };
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'ListSelect',
          params: {
            user,
          },
        }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TextInput
          style={styles.input}
          placeholder="E-Mail Address"
          keyboardType="email-address"
          autoCapitalize="none"
          onEndEditing={this.validateEmail}
          onChangeText={text => this.onChangeEmail(text)}
          value={this.state.email}
          selectionColor={Colors.accent}
          underlineColorAndroid={Colors.accent}
        />
        <Text style={styles.error}>{this.state.emailError}</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={text => this.onChangePassword(text)}
          value={this.state.password}
          selectionColor={Colors.accent}
          underlineColorAndroid={Colors.accent}
        />
        <Text style={styles.error}>{this.state.passwordError}</Text>
        <TouchableOpacity style={styles.loginButton} onPress={this.onLoginPress}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={this.onSignUpPress}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;

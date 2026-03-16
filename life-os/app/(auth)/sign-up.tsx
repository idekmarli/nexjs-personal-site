import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ScreenContainer,
  AppText,
  PrimaryButton,
  TextInput,
  Spacer,
} from '@/components/primitives';
import { useAuthStore } from '@/stores/auth-store';
import { colors, spacing } from '@/theme';

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const { signUp, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setError('');
    const { error: authError } = await signUp(email.trim(), password);
    if (authError) {
      setError(authError.message);
    }
  };

  return (
    <ScreenContainer scrollable={false} padded>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={[styles.content, { paddingTop: insets.top + spacing['3xl'] }]}>
          <AppText variant="largeTitle" align="center">
            Welcome
          </AppText>
          <AppText variant="body" align="center" style={styles.tagline}>
            Start building your personal operating system
          </AppText>

          <Spacer size="3xl" />

          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            label="Password"
            placeholder="At least 8 characters"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <TextInput
            label="Confirm Password"
            placeholder="Repeat your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          {error ? (
            <>
              <AppText variant="caption" color={colors.error} align="center">
                {error}
              </AppText>
              <Spacer size="md" />
            </>
          ) : null}

          <Spacer size="md" />

          <PrimaryButton
            title={isLoading ? 'Creating account...' : 'Create Account'}
            onPress={handleSignUp}
            disabled={isLoading}
          />

          <Spacer size="xl" />

          <Link href="/(auth)/sign-in" style={styles.link}>
            <AppText variant="label" color={colors.accent} align="center">
              Already have an account? Sign in
            </AppText>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  tagline: {
    marginTop: spacing.sm,
  },
  link: {
    alignSelf: 'center',
  },
});

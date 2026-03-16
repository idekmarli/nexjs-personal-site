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

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const { signIn, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    const { error: authError } = await signIn(email.trim(), password);
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
        <View style={[styles.content, { paddingTop: insets.top + spacing['4xl'] }]}>
          <AppText variant="largeTitle" align="center">
            Life OS
          </AppText>
          <AppText variant="body" align="center" style={styles.tagline}>
            Your calm personal operating system
          </AppText>

          <Spacer size="4xl" />

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
            placeholder="Your password"
            value={password}
            onChangeText={setPassword}
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
            title={isLoading ? 'Signing in...' : 'Sign In'}
            onPress={handleSignIn}
            disabled={isLoading}
          />

          <Spacer size="xl" />

          <Link href="/(auth)/sign-up" style={styles.link}>
            <AppText variant="label" color={colors.accent} align="center">
              Don't have an account? Sign up
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

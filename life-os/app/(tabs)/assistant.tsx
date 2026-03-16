import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput as RNTextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText, Card, Spacer } from '@/components/primitives';
import { aiService } from '@/services';
import { AssistantResponse } from '@/domain/schemas';
import { colors, spacing, radii, shadows } from '@/theme';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actions?: Array<{ label: string; type: string }>;
}

const PROMPT_CHIPS = [
  'What should I focus on today?',
  'Help me plan my week',
  'I feel overwhelmed',
  'Review my priorities',
];

export default function AssistantScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiService.chat(text.trim(), {});

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        actions: response.suggested_actions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "I'm having trouble connecting right now. Your question has been noted — try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.role === 'user' ? styles.userBubble : styles.assistantBubble,
      ]}
    >
      <AppText
        variant="body"
        color={item.role === 'user' ? colors.textInverse : colors.textPrimary}
      >
        {item.content}
      </AppText>

      {item.actions && item.actions.length > 0 && (
        <View style={styles.actionsRow}>
          {item.actions.map((action, idx) => (
            <TouchableOpacity key={idx} style={styles.actionChip}>
              <AppText variant="caption" color={colors.accent} weight="medium">
                {action.label}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const showEmptyState = messages.length === 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={[styles.headerArea, { paddingTop: insets.top + spacing.lg }]}>
        <AppText variant="largeTitle">Assistant</AppText>
        <AppText variant="body" style={styles.subtitle}>
          Your calm, capable chief of staff
        </AppText>
      </View>

      {showEmptyState ? (
        <View style={styles.emptyState}>
          <View style={styles.avatarCircle}>
            <AppText variant="title">✦</AppText>
          </View>
          <Spacer size="xl" />
          <AppText variant="heading" align="center">
            How can I help?
          </AppText>
          <AppText variant="body" align="center" style={styles.helperText}>
            I know your priorities, routines, and context. Ask me anything.
          </AppText>

          <Spacer size="3xl" />

          <AppText variant="overline">SUGGESTED</AppText>
          <Spacer size="md" />
          <View style={styles.chipsContainer}>
            {PROMPT_CHIPS.map((chip) => (
              <TouchableOpacity
                key={chip}
                style={styles.chip}
                onPress={() => sendMessage(chip)}
                activeOpacity={0.7}
              >
                <AppText variant="caption" weight="medium" color={colors.accent}>
                  {chip}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />
      )}

      {isLoading && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color={colors.accent} />
          <AppText variant="caption" style={styles.typingText}>
            Thinking...
          </AppText>
        </View>
      )}

      <View style={[styles.inputBar, { paddingBottom: insets.bottom + spacing.sm }]}>
        <RNTextInput
          style={styles.textInput}
          placeholder="Ask anything..."
          placeholderTextColor={colors.textMuted}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => sendMessage(input)}
          returnKeyType="send"
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
          onPress={() => sendMessage(input)}
          disabled={!input.trim() || isLoading}
        >
          <AppText variant="label" color={colors.textInverse}>
            ↑
          </AppText>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerArea: {
    paddingHorizontal: spacing.xl,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperText: {
    marginTop: spacing.sm,
    maxWidth: 280,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.accentSoft,
    borderRadius: radii.full,
  },
  messageList: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: spacing.md,
    borderRadius: radii.lg,
    marginBottom: spacing.md,
  },
  userBubble: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: radii.sm,
  },
  assistantBubble: {
    backgroundColor: colors.backgroundSubtle,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: radii.sm,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  actionChip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.backgroundElevated,
    borderRadius: radii.md,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  typingText: {
    marginLeft: spacing.sm,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    backgroundColor: colors.backgroundElevated,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderLight,
    gap: spacing.sm,
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.backgroundSubtle,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.textPrimary,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.textMuted,
  },
});

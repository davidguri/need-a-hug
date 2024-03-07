import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';

export default function Button(props: any) {
  return (
    <TouchableOpacity style={[styles.button, (props.light ? styles.buttonLight : styles.buttonDark), props.styles]} onPress={props.onPress} disabled={props.disabled}>
      <Text style={[styles.buttonText, props.textStyles]}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonDark: {
    backgroundColor: colors.secondary,
    color: colors.text
  },

  buttonLight: {
    backgroundColor: colors.lightSecondary,
    color: colors.lightText
  },

  buttonText: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 18,
    marginHorizontal: 12,
  },
});
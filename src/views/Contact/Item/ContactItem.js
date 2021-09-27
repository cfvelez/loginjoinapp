import React from 'react';
import {Text,View, Image, TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-ionicons';
import ContactItemStyle from './ContactItemStyle';

const styles = StyleSheet.create(ContactItemStyle);

const ContactItem = ({contact, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{uri:contact.cover}} style={styles.image} />
        <Text>{contact.name} {contact.lastname}</Text>
        <Icon name="arrow-forward" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

export default ContactItem;

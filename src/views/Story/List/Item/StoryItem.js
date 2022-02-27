import React from 'react';
import {Text,View, TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-ionicons';
import StoryItemStyle from './StoryItemStyle';

const styles = StyleSheet.create(StoryItemStyle);

const StoryItem = ({story, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text>{story.title}</Text>
        <Icon name="arrow-forward" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

export default StoryItem;

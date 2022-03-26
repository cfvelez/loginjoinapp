import React from 'react';
import {Text,View, TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-ionicons';
import StoryPointItemStyle from './StoryPointItemStyle';

const styles = StyleSheet.create(StoryPointItemStyle);

const StoryPointItem = ({storypoint, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text>{storypoint.name}</Text>
        <Icon name="arrow-forward" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

export default StoryPointItem;

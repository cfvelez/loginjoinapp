import React from 'react';
import {Text,View, TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-ionicons';
import ResourceItemStyle from './ResourceItemStyle';

const styles = StyleSheet.create(ResourceItemStyle);

const ResourceItem = ({resource, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text>{resource.title}</Text>
        <Icon name="arrow-forward" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

export default ResourceItem;

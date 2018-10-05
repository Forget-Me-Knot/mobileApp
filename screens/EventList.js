import React from 'react';
import { ScrollView, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

const EventList = props => {
  return (
    <ScrollView>
      <View>
        <List containerStyle={{ marginBottom: 20 }}>
          {props.events.map(l => (
            <ListItem
              //needs delete button
              leftIcon={{ name: 'lens', color: `#${l.color}` }}
              key={l.key}
              title={l.name}
              hideChevron
            />
          ))}
        </List>
      </View>
    </ScrollView>
  );
};
export default EventList;

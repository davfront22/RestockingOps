import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
export default function InfoRes({ title, content }) {
    const navigation = useNavigation();
    return (
    <View>
            <View style={styles.container}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.content}>{content}</Text>
            </View>
    </View>

            
          );
        }
        
        const styles = StyleSheet.create({
          container: {
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          },
          title: {
            fontWeight: 'bold',
            fontSize: 18,
            alignContent:'flex-start',
            alignItems:'flex-start',
            alignSelf:'flex-start'
          },
          content: {
            fontSize: 18,
          },
        });
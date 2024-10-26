import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Image } from 'react-native'
import { useState } from 'react'

export default function UserIntro() {
    const {user}=useUser
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    const handleSubmit = () => {
        if (name && email && contactNumber) {
          Alert.alert('Form Submitted', `Name: ${name}\nEmail: ${email}\nContact: ${contactNumber}`);
          // Here you can handle the form data (e.g., send it to a server or save it locally)
        } else {
          Alert.alert('Error', 'Please fill in all fields');
        }
      };


  return (
//     <View style={{
//         display:'flex',
//         justifyContent:'center',
//         alignItems:'center',
//         marginTop:30    
//     }}>
//       <Image source={{uri:user?.imageUrl}}
//       style={{
//         width:100,
//         height:100,
//         borderRadius:99,
//       }}
//       />
//   <Text style={{
//     fontFamily:'outfit-bold',
//     fontSize:20
//   }}>{user?.fullName}</Text>
//   <Text>{user?.primaryEmailAddress?.emailAddress}</Text>
//     </View>

<View style={styles.container}>
<Text style={styles.label}>Name</Text>
<TextInput
  style={styles.input}
  placeholder="Enter your name"
  value={name}
  onChangeText={setName}
/>

<Text style={styles.label}>Email</Text>
<TextInput
  style={styles.input}
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>

<Text style={styles.label}>Contact Number</Text>
<TextInput
  style={styles.input}
  placeholder="Enter your contact number"
  value={contactNumber}
  onChangeText={setContactNumber}
  keyboardType="phone-pad"
/>

<Button title="Submit" onPress={handleSubmit} />
</View>
  

  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      paddingTop:300
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color:'#000'
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 15,
      padding: 10,
      borderRadius: 5,
    },
  });
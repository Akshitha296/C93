import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, Image } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'

export default class QuestionScreen extends React.Component{
    constructor(){
        super()
        this.state = {
          questions : []
        }
      this.requestRef= null
      }
    
      getQuestions =()=>{
        this.requestRef = db.collection("questions")
        .onSnapshot((snapshot)=>{
          var questions = snapshot.docs.map(document => document.data());
          this.setState({
            questions : questions
          });
        })
      }
    
      componentDidMount(){
        this.getQuestions()
      }
    
      componentWillUnmount(){
        this.requestRef();
      }
    
      keyExtractor = (item, index) => index.toString()
    
      renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={item.book_name}
            subtitle={item.reason_to_request}
            titleStyle={{ color: 'white', fontWeight: 'bold' }}
            // rightElement={
            //     <TouchableOpacity style={styles.button}
            //     onPress = {() =>{
            //                   this.props.navigation.navigate('ReceiverDetailsScreen', {'details': item})
            //                 }}
            //     >
            //       <Text style={{color:'white', fontWeight: 'bold'}}>View</Text>
            //     </TouchableOpacity>
            //   }
            bottomDivider
          />
        )
      }
    
      // renderItem = ({item, i}) =>{
      //   return(
      //     <ListItem
      //       key = {i}
      //       bottomDivider
      //     >
      //       <ListItem.Content>
      //         <ListItem.Title
      //           style = {{ color: 'black', fontWeight: 'bold' }}
      //       >
      //           {item.book_name}
      //       </ListItem.Title>

      //       <ListItem.Subtitle
      //         style = {{color: 'green'}}
      //       >
      //         {item.reason_to_request}
      //       </ListItem.Subtitle>

      //       <TouchableOpacity
      //          style={styles.button}
      //          onPress = {() =>{
      //            this.props.navigation.navigate('ReceiverDetailsScreen', {'details': item})
      //          }}
      //       >
      //         <Text style={{color:'#ffff'}}>View</Text>
      //       </TouchableOpacity>
      //     </ListItem.Content>

      //     </ListItem>
      //   )
      // }

      render(){
        return(
          <View style={{flex:1}}>
              {
                this.state.questions.length === 0
                ?(
                  <View style={styles.subContainer}>
                    <Text style={{ fontSize: 20}}>Today's Questions</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.requestedBooksList}
                    renderItem={this.renderItem}
                  />
                )
              }
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      subContainer:{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center'
      },
      button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#FB6D4C",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
         }
      }
    })
import React, { useState } from 'react';
import { Button } from 'react-native';
import { Text, View, StyleSheet, Image, ScrollView, TouchableWithoutFeedback} from 'react-native';
import BookDetailTab from '../components/BookDetailTab';
 

const bookData = require('../data/books-data.json');

const BookDetailScreen = props => {

    const [isReview, setIsReview] = useState(false);

    selectedBookId = props.navigation.getParam('bookId')
    const selectedBook = bookData.items.find(book => book.id === selectedBookId);

    function isForSale(){
        if(selectedBook.saleInfo.saleability == "FOR_SALE")
            return <Text style={styles.textStyles}>Price: ${selectedBook.saleInfo.retailPrice.amount}</Text> 
        else
            return <Text style={styles.notForSale}>NOT FOR SALE</Text>
    }

    const confirmReviewHandler = () => {
        setIsReview(false);
    }

    const notConfirmReviewHandler = () => {
        setIsReview(true);
    }

    let content;

    if(!isReview) {
        content = (
            <View style={styles.container}>
                <Text style={styles.textStyles}>Title: {selectedBook.volumeInfo.title}</Text>
                <Text style={styles.textStyles}>Author: {selectedBook.volumeInfo.authors}</Text>
                <Text numberOfLines={2} style={styles.descriptionStyle}>
                    Description: {selectedBook.volumeInfo.description}
                </Text>
                <Text>Read more...</Text>
                {isForSale()}
            </View>)
    }

    if(isReview) {
        content = (
            <View style={styles.container}>
                <Text style={styles.textStyles}>Rating: {selectedBook.volumeInfo.averageRating} / 5</Text>
            </View>)
    }

    return (
            <ScrollView style={styles.viewStyle}>
            <View style={styles.container}>
                <Image style={{width: 250, height: 400}} source={{uri: selectedBook.volumeInfo.imageLinks.thumbnail}} />
            </View>
            <View style={styles.tabContainer}>
                <BookDetailTab title='detail' onPress={confirmReviewHandler}/>
                <BookDetailTab title='reviews' onPress={notConfirmReviewHandler} />
            </View>
                {content}
            </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginBottom: 10,
        alignItems: "center",
    },
    textStyles: {
        fontSize: 25,
        marginTop: 10
    },
    notForSale: {
        fontSize: 25,
        marginTop: 10,
        color: "red"
    },
    descriptionStyle: {
        fontSize: 15,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    viewStyle: {
        backgroundColor: "#cccccc"
    },
    tabContainer: {
        marginLeft: '10%',
        flexDirection: 'row',
    }
});

export default BookDetailScreen;
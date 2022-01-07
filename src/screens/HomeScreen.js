import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import { COLORS } from '../theme/colors'

const HomeScreen = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchdata()
    }, [])

    useEffect(() => {
        console.log(data.length)
    }, [data])

    const fetchdata = () => {
        fetch('https://itunes.apple.com/in/rss/topalbums/limit=25/json')
            .then((response) => response.json())
            .then((json) => setData(json.feed.entry))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    return (
        <SafeAreaView style={styles.pageContainer}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <View style={styles.imageContainer}>
                            <FlatList
                                data={item["im:image"]}
                                horizontal={true}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item, index }) =>
                                    <Image
                                        style={{
                                            height: index == 0 ? parseInt(item.attributes.height) : 0,
                                            width: index == 0 ? parseInt(item.attributes.height) : 0,
                                        }}
                                        source={{
                                            uri: item.label
                                        }}
                                    />
                                }
                            />
                            <Text style={styles.imageText}>{item["im:name"].label}</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    pageContainer: {
        alignItems: 'center',
        backgroundColor: 'white'
    },
    imageContainer: {
        width: "90%",
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    imageText: {
        fontSize: 12,
        color: "black",
        width: "80%",
    }
})

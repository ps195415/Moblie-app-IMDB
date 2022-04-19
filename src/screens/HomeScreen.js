import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
import MovieCard from "../components/MovieCard";
import ItemSeparator from "../components/ItemSeparator";
import {
    getNowPlayingMovies,
    getUpcomingMovies,
} from "../services/MovieService";

const HomeScreen = ({ navigation }) => {
    const [nowPlayingMovies, setNowPlayingMovies] = useState({});
    const [upcomingMovies, setUpcomingMovies] = useState({});

    const getNowPlayingMoviess = async () => {
        try {
            const response = await fetch(
                'https://reactnative.dev/movies.json'
            );
            const json = await response.json();
            setNowPlayingMovies(json.movies)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getNowPlayingMoviess();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <StatusBar
                style="auto"
                translucent={false}
                backgroundColor={COLORS.BASIC_BACKGROUND}
            />
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Now Showing</Text>
                <Text style={styles.headerSubTitle}>VIEW ALL</Text>
            </View>
            <View>
                <FlatList
                    data={nowPlayingMovies.results}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <ItemSeparator width={20} />}
                    ListHeaderComponent={() => <ItemSeparator width={20} />}
                    ListFooterComponent={() => <ItemSeparator width={20} />}
                    renderItem={({ item }) => (
                        <MovieCard
                            title={item.title}
                            language={item.original_language}
                            voteAverage={item.vote_average}
                            voteCount={item.vote_count}
                            poster={item.poster_path}
                            heartLess={false}
                            onPress={() => navigation.navigate("movie", { movieId: item.id })}
                        />
                    )}
                />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Coming Soon</Text>
                <Text style={styles.headerSubTitle}>VIEW ALL</Text>
            </View>
            <View>
                <FlatList
                    data={upcomingMovies.results}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <ItemSeparator width={20} />}
                    ListHeaderComponent={() => <ItemSeparator width={20} />}
                    ListFooterComponent={() => <ItemSeparator width={20} />}
                    renderItem={({ item }) => (
                        <MovieCard
                            title={item.title}
                            language={item.original_language}
                            voteAverage={item.vote_average}
                            voteCount={item.vote_count}
                            poster={item.poster_path}
                            size={0.6}
                            onPress={() => navigation.navigate("movie", { movieId: item.id })}
                        />
                    )}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BASIC_BACKGROUND,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: FONTS.REGULAR,
    },
    headerSubTitle: {
        fontSize: 13,
        color: COLORS.ACTIVE,
        fontFamily: FONTS.BOLD,
    },
    genreListContainer: {
        paddingVertical: 10,
    },
});

export default HomeScreen;
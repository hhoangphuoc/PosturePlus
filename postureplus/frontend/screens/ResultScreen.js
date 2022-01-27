import React from "react";
import { View, Text, FlatList } from "react-native";
import { SIZES, COLORS, icons, dummydata } from "../constant";
import { Section, VerticalCard } from "../components";

const ResultScreen = ({ navigation, route }) => {
  const { exercise } = route.params;

  const port = 8888;
  //   const ip = "192.168.1.102";
  //   const ip = "84.83.237.67";
  const ip = "192.168.119.1";

  function getMistakes() {
    const API = `http://${ip}:${port}/api/mistakes`;
    fetch(API)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // setLoading(false);
        setData(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  function getRecommendedExercises() {
    console.log("get recommended exercises API here"); // For testing

    fetch(API)
      .then((response) => {
        console.log("API here!!!!"); // For testing
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setData(json);
      })
      .catch((err) => alert(err));
  }

  function renderResultBoard() {
    console.log("IN Render Result Board ");
    //fetch the recommended_exercises
    const [mistakeData, setMistakeData] = React.useState([]);
    // const API = `http://192.168.119.1:8888/api/mistakes`;
    const API = "https://postureplus-test.herokuapp.com/api/mistakes";
    React.useEffect(() => {
      console.log("IN Use Effect");
      fetch(API)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // setLoading(false);
          setMistakeData(data);
        })
        .catch((error) => {
          alert(error.message);
        });

      //clear the data
      return () => {};
    }, []);
    return (
      <View
        style={{
          backgroundColor: COLORS.primary,
          top: 30,
          width: "95%",
          height: 280,
          marginTop: SIZES.padding,
          marginBottom: SIZES.base,
          alignSelf: "center",
          borderRadius: SIZES.radius,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: SIZES.h1,
              lineHeight: 36,
              color: COLORS.white,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            RESULTS
          </Text>
          <Text
            style={{
              fontSize: 22,
              lineHeight: 30,
              color: COLORS.white,
            }}
          >
            {exercise?.name}
          </Text>
        </View>
        <View
          style={{
            marginLeft: SIZES.padding,
            marginTop: SIZES.base,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                paddingTop: SIZES.base,
                fontSize: SIZES.h4,
                color: COLORS.white,
                letterSpacing: 0.8,
              }}
            >
              Number of Corrects:
            </Text>
            <Text
              style={{
                paddingTop: SIZES.base,
                marginRight: 40,
                fontSize: SIZES.h4,
                color: COLORS.white,
                letterSpacing: 0.8,
              }}
            >
              {mistakeData[0]?.num_corrects}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                paddingTop: SIZES.base,
                fontSize: SIZES.h4,
                color: COLORS.white,
                letterSpacing: 0.8,
              }}
            >
              Number of Errors:
            </Text>
            <Text
              style={{
                paddingTop: SIZES.base,
                marginRight: 40,
                fontSize: SIZES.h4,
                color: COLORS.white,
                letterSpacing: 0.8,
              }}
            >
              {mistakeData[0]?.num_errors}
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                paddingTop: SIZES.base,
                fontSize: SIZES.h4,
                color: COLORS.white,
              }}
            >
              Suggestion:
            </Text>
            <Text
              style={{
                paddingTop: 8,
                paddingLeft: SIZES.radius,
                fontSize: SIZES.h4,
                color: COLORS.black,
              }}
            >
              {mistakeData[0]?.suggestions}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderRecommendedExercises() {
    return (
      <Section
        title="To be continue..."
        containerStyle={{
          top: 20,
          marginTop: SIZES.padding,
        }}
        titleStyle={{
          fontSize: 20,
          lineHeight: 22,
        }}
      >
        <FlatList
          data={dummydata.recommended}
          listKey="Recommended"
          keyExtractor={(item) => `Recommended-${item.id}`}
          showsHorizontalScrollIndicator={false} //disable scroll bar
          contentContainerStyle={{
            marginTop: SIZES.base,
          }}
          //render custom sub-component inside this list.
          renderItem={({ item, index }) => (
            <VerticalCard
              sharedElementPrefix="Result"
              containerStyle={{
                marginVertical: SIZES.padding,
                marginLeft: SIZES.padding,
                borderRadius: SIZES.base,
                marginTop: index === 0 ? 12 : 8,
              }}
              exercise={item}
              onPress={() =>
                navigation.navigate("ExerciseOverview", {
                  exercise: item,
                  sharedElementPrefix: "Result",
                })
              }
            />
          )}
        ></FlatList>
      </Section>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {renderResultBoard()}
      {renderRecommendedExercises()}
    </View>
  );
};

export default ResultScreen;

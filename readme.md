This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

Below you'll find information about performing common tasks. The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).


# Project Setup

## Requirement
Yon need to install the expo application on your phone to use this app on your phoe.
Alternatively, you can run the app on your computer IOS (Xcode) or Android (Android Studio)

## Production App URL
```
https://expo.dev/@akinmyde/quidax
```
## Installing all dependencies required
```
run npm install or yarn install
```

## Starting the App IOS
```
yarn run ios
```

## Starting the App IOS
```
yarn run android
```

# Assumptions
I make us of React Context to manage my state. Expecially the part of persisting the cart. An alternative would have been making use of a store like redux or perhaps use the the Async-Storage package.

I make use of Context API because I really don't want to add another layer of obfuscation to the code. I see the application a basic as it is since I only need to manage few states and data.

Also, I didn't make use of the GraphQL API to get a single book. Reason is that I already have the list of books from the Get all books GraphQL API and the information from the getAll API is sufficient to power up the book details page.

# Requirements
Due to time, I was not able to perfectly implement the search feature to my taste and the taste of the requiremnt. Although, it is hard to notice that something is off.

## Issues Faced
The main issue is faced completing this assessment is time. due to my current tight schedule,I was only able to dedicate few hours of my time for this assessment.

Also, I had to design the carousel from scratch. I didn't get a module with the similar design and one that works exactly as I want. It was a bit challenging as it takes some time.

## Feedback
I think the figma design should give applicant the privilege to view the margin, padding, fonts and colors from each layout.

It might be a bit difficult to size the spacing (margin and padding) with the eye or hand. tools like color picker could help pick the color for a particular section, but they aren't 100% efficient
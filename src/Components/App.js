import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import Login from '../Components/Login';
import Header from '../Components/Header';
import Home from '../Components/Home';
import Videos from '../Components/Videos';
import MyWords from '../Components/MyWords';
import axios from 'axios';
import { oneToTwoDigits, secondsConverter } from '../Utility';
import './Common.scss';
import './App.scss';
import REQUEST_URL from '../Constants/requestUrl';

function App(props) {
  console.log(props);
  const {
    dictionary,
    request,
    selected,
    getUserData,
    getVideoData,
    getDictionaryData,
    myWords,
    updateMyWords,
    userInfo,
    isLoggedIn,
    addVideoInfoToDictionary,
  } = props;

  useEffect(props => {
    const fetchLoginData = async () => {
      console.log('유저 가져오기');
      const response = await axios.get(REQUEST_URL.LOGIN_SUCCESS, {
        // withCredentials: 'include',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin' : 'https://api.letsdoyi.com',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': false,
        },
      });
      console.log(response);
      const user = response.data.user;
      if (user) {
        getUserData(user);
        console.log('유저 결과 확인:', user);
        const myWordsKeys = Object.keys(user.my_words);
        myWordsKeys.forEach(wordKey => {
          updateMyWords(user.my_words[wordKey], 'add');
        });
      }
    };
    fetchLoginData();
  }, []);
  console.log(request.isReadyToGetVideos);

  if (request.isReadyToGetVideos) {
    console.log('READEY TO GET VIDEOS');
    const requestVideoData = async () => {
      const postResponse = await axios.post(
        `${REQUEST_URL.POST_SEARCH_RESULT_FOR_VIDEO}/query=${selected.word}&language=${selected.language}&categories=${selected.categories}`,
        {
          selected,
        }
      );
    };
    requestVideoData();

    //requestVideoData
    const fetchVideoData = async () => {
      console.log('fetchVideoData 실행');
      const getResponse = await axios.get(REQUEST_URL.GET_VIDEO_SUCCESS, {
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin' : 'https://api.letsdoyi.com',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      });
      console.log('fromServer:', getResponse.data.searched);
      const foundWord = getResponse.data.searched.word;
      let info = getResponse.data.searched.videosInfo;

      if (info.length !== 0) {
        info.forEach(videoInfo => {
          videoInfo.captions.forEach(caption => {
            const startTime = Math.floor(Number(caption.start));
            const time = secondsConverter(startTime, 'sec');
            const mins = oneToTwoDigits(time.hours / 60 + time.minutes);
            const secs = oneToTwoDigits(time.seconds);
            caption.startForDisplay = `${mins}:${secs}`;
          });
        });
        getVideoData({ foundWord, info });
        console.log('foundWord', foundWord);
        if (selected.word === foundWord) {
          console.log('addVideoInfoToDic');
          addVideoInfoToDictionary(info);
        }
      } else {
        console.log('Cannot find any videos!');
        getVideoData({ foundWord: '$NO_DATA', info: [] });
      }
      console.log('가져온 비디오 정보', info);
    };
    fetchVideoData();

    //requestDictionaryData

    const requestDictionaryData = async () => {
      //check vaild word - input 에서 미리 확인하기
      if (selected.word) {
        const postDictionaryResponse = await axios.post(
          REQUEST_URL.POST_SEARCH_RESULT_FOR_DICTIONARY,
          {
            word: selected.word,
          }
        );
        console.log('사전 결과:', postDictionaryResponse.data.dictionary);
        let dictionary = postDictionaryResponse.data.dictionary;
        getDictionaryData(dictionary);
      } else {
        console.log('selected word is not valid');
      }
    };
    requestDictionaryData();
  }

  if (request.isReadyToPostWord) {
    console.log('post 요청 myWords:', myWords);
    console.log('요청 보낼 데이터:', userInfo.google_id, myWords);
    const requestPostAddedWord = async () => {
      const postMyWordResponse = await axios.post(REQUEST_URL.POST_ADDED_WORD, {
        google_id: userInfo.google_id,
        myWords,
      });
      console.log('postMyWordResponse:', postMyWordResponse);
    };
    requestPostAddedWord();
  }

  if (request.isReadyToDeleteWord.value) {
    console.log('삭제 요청 보낼 데이터:', userInfo.google_id);
    let word = request.isReadyToDeleteWord.target;
    console.log(word);
    const requestDeleteWord = async () => {
      const deleteMyWordResponse = await axios.delete(REQUEST_URL.DELETE_WORD, {
        data: {
          google_id: userInfo.google_id,
          word,
        },
      });
      console.log('deleteMyWordResponse:', deleteMyWordResponse);
    };
    requestDeleteWord();
  }

  return (
    <div className="App">
      {window.location.pathname !== '/login' && (
        <header className="App-header">
          <Header {...props} />
        </header>
      )}

      <Route
        exact
        path="/"
        render={renderProps => <Home {...props} {...renderProps} />}
      />
      <Route exact path="/login" render={() => <Login />} />
      <Route
        path="/videos"
        render={renderProps => <Videos {...props} {...renderProps} />}
      />
      <Route
        path="/myWords"
        render={renderProps => <MyWords {...props} {...renderProps} />}
      />
      {/* <Route
        path="/error"
        render={renderProps => <Error {...props} {...renderProps} />}
      /> */}
      {/* <Route
        path="/myChannels"
        render={renderProps => (
          <MyChannel {...props} {...renderProps} />
        )}
      /> */}
    </div>
  );
}

export default App;

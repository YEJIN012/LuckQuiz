import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { setQuizSet } from "models/quiz";
import { setQuizItem } from "models/quiz";


const quizItem: setQuizItem ={
   
    type: "",
    // 'quiz', 'game'
    quiz: "",
    // 'text, four, ox,
    quizUrl: "",
    answer: "",
    one: "",
    two:"",
    three: "",
    four: "",
    question: "",
    answerList: [], 
    game: "",
    //balloon, wakeup, emotion
    timer: 0
}

// 전역 로그인 데이터 기본 값 설정
const initialQuizSet: setQuizSet ={
    hostId: "7fb5bc30-c7c6-4cd9-859d-2bb4ef982644",
    templateId: 7,
    quizList:[]
}

//{index: selectInfo.choiceType, gameType: gameType
const quizSlice = createSlice({
name: "quiz",
initialState: initialQuizSet,
reducers:{
    addQuiz:(state,action)=>{
        state.quizList.push(action.payload);
    },
    removeQuiz:(state, action)=>{
        state.quizList=state.quizList.filter((it,index)=> index!==action.payload);
    }
    ,
    locationUpdate:(state, action)=>{
        state.quizList=action.payload;
    }, 
    chooseQuiz:(state, action)=>{
        
        state.quizList=action.payload;
    },
    gameTypeUpdate:(state, action)=>{
        const { index, gameType } = action.payload;
        state.quizList = produce(state.quizList, draftList => {
            draftList[index].game = gameType;
        });
    },
    quizTypeUpdate:(state, action)=>{
        const { index, type } = action.payload;

        state.quizList = produce(state.quizList, draftList => {
            draftList[index].quiz = type;
        });
    },
    quizTimeUpdate:(state, action)=>{
        const { index, time } = action.payload;
        state.quizList = produce(state.quizList, draftList => {
            draftList[index].timer = time;
        });
    },
    contentsUpdate:(state, action)=>{
        const { index, content } = action.payload;
        state.quizList = produce(state.quizList, draftList => {
            draftList[index]= content;
        });
    },
}
    
}
)

// slice안에 있는 action들 뽑아내
export const quizAtions = quizSlice.actions;
// reducer 속성을 추출하여, 이를 해당 모듈의 기본 내보내기
export default quizSlice.reducer;



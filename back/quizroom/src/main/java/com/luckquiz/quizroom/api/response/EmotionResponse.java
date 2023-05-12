package com.luckquiz.quizroom.api.response;

import lombok.Setter;

import javax.annotation.Nullable;

@Setter
public class EmotionResponse {
    public String type;
    public class EmotionResult{
        public com.luckquiz.quizroom.model.EmotionResult.Roi roi;
        public com.luckquiz.quizroom.model.EmotionResult.ValCon emotion;
    }
    public EmotionResult emotionResult;



}

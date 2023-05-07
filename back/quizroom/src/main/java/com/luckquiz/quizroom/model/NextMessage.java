package com.luckquiz.quizroom.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NextMessage {
    private Integer roomId;
    private String sender;
    private int quizNum;
}

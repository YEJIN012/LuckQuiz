package com.luckquiz.quiz.api.controller;

import com.luckquiz.quiz.api.service.RedisTransService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@Slf4j
@RequiredArgsConstructor
public class QuizRoomConsumerController {
    private final RedisTransService redisTransService;
    private final StringRedisTemplate stringRedisTemplate;
    @KafkaListener(topics = "server_message",groupId = "test")
    public void quizStart(ConsumerRecord<String , String> in, @Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws Exception{
        if("start".equals(key)){
            String value = in.value();
            UUID hostId = UUID.fromString(value.split(" ")[0]);
            int roomId = Integer.parseInt(value.split(" ")[1]);
            int templateId = Integer.parseInt(value.split(" ")[2]);
            System.out.println(templateId + "    roomId: "+roomId + "    hostId: "+hostId);
            redisTransService.quizRedisTrans(roomId,hostId,templateId);  // roomId 로
            redisTransService.roomTempTrans(roomId,hostId,templateId);
        }
    }

    @KafkaListener(topics = "server_message",groupId = "test")
    public void quizEnd(ConsumerRecord<String , String> in,@Header(KafkaHeaders.RECEIVED_MESSAGE_KEY) String key) throws Exception{
        if("end".equals(key)){
            String value = in.value();
            Integer roomId = Integer.parseInt(value);
            String roomInfo = stringRedisTemplate.opsForValue().get(roomId);


        }
    }
}

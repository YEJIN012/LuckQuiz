import LobbyComp from "components/common/lobby/LobbyComp";
import styles from "./ShowPin.module.css";
import logo from "assets/images/logo.png";
import qr_sample from "assets/images/qr_sample.png";
import ButtonWithLogo from "components/common/ButtonWithLogo";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { socketActions } from "store/webSocket";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HostLobby = () => {
  const navigate = useNavigate()
  const { quiz_id } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const quizItem = useSelector((state: RootState) => state.socket.QuizItem)
  const dispatch = useDispatch();

  useEffect(() => {
    quizItem && navigate(`/host/quiz/${quiz_id}/play`)
  }, [navigate, quizItem, quiz_id])

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <img src={logo} alt="" className={styles.logo} />
        <div className={styles.whiteBox}>
          <div className={styles.pinBox}>
            <p>퀴즈 입장 pin번호</p>
            <p>{quiz_id}</p>
          </div>
          <img src={qr_sample} alt="" />
        </div>
      </div>
      <LobbyComp />
      <ButtonWithLogo
        name="시작하기"
        height="40px"
        fontSize="20px"
        // onClick={() => dispatch(socketActions.sendAnswerMessage({ roomId: quiz_id, hostId: userId }))}
        onClick={() => dispatch(socketActions.sendAnswerMessage({ roomId: "3670055", hostId: userId }))}
      />
    </div>
  );
};
export default HostLobby;
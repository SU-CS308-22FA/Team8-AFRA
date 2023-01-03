import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./SingleReferee.css";
import axios from "axios";

import AbdulkadirBitigen from "../../screens/SingleReferee/refereeImages/abdulkadir-bitigen.jpg";
import AliPalabiyik from "../../screens/SingleReferee/refereeImages/ali-palabiyik.jpg";
import AliSansalan from "../../screens/SingleReferee/refereeImages/ali-sansalan.jpg";
import ArdaKardesler from "../../screens/SingleReferee/refereeImages/arda-kardesler.png";
import AtillaKaraoglan from "../../screens/SingleReferee/refereeImages/atilla-karaoglan.jpg";
import BahattinSimsek from "../../screens/SingleReferee/refereeImages/bahattin-simsek.jpg";
import BurakSeker from "../../screens/SingleReferee/refereeImages/burak-seker.jpg";
import CagdasAltay from "../../screens/SingleReferee/refereeImages/cagdas-altay.jpg";
import ErkanOzdamar from "../../screens/SingleReferee/refereeImages/erkan-ozdamar.jpg";
import HalilUmutMeler from "../../screens/SingleReferee/refereeImages/halil-umut-meler.jpg";
import HuseyinGocek from "../../screens/SingleReferee/refereeImages/huseyin-gocek.jpg";
import KadirSaglam from "../../screens/SingleReferee/refereeImages/kadir-saglam.jpg";
import MertGuzenge from "../../screens/SingleReferee/refereeImages/mert-güzenge.jpg";
import MeteKalkavan from "../../screens/SingleReferee/refereeImages/mete-kalkavan.jpg";
import MustafaKursadFiliz from "../../screens/SingleReferee/refereeImages/mustafa-kursad-filiz.jpg";
import SarperBarisSaka from "../../screens/SingleReferee/refereeImages/sarper-baris-saka.jpg";
import SuatArslanboga from "../../screens/SingleReferee/refereeImages/suat-arslanboga.jpg";
import TugayKaanNumanoglu from "../../screens/SingleReferee/refereeImages/tugay-kaan-numanoglu.jpg";
import UmitOzturk from "../../screens/SingleReferee/refereeImages/umit-ozturk.jpg";
import VolkanBayarslan from "../../screens/SingleReferee/refereeImages/volkan-bayarslan.jpg";
import YasarKemalUgurlu from "../../screens/SingleReferee/refereeImages/yasar-kemal-ugurlu.jpg";
import YasinKol from "../../screens/SingleReferee/refereeImages/yasin-kol.jpg";
import ZorbayKucuk from "../../screens/SingleReferee/refereeImages/zorbay-kucuk.jpg";

function SingleReferee() {
  const params = useParams();
  const refereeName = params.refereeName;
  const images = [
    { id: "Abdulkadir Bitigen", src: AbdulkadirBitigen },
    { id: "Ali Palabıyık", src: AliPalabiyik },
    { id: "Ali Şansalan", src: AliSansalan },
    { id: "Arda Kardeşler", src: ArdaKardesler },
    { id: "Atilla Karaoğlan", src: AtillaKaraoglan },
    { id: "Bahattin Şimşek", src: BahattinSimsek },
    { id: "Burak Şeker", src: BurakSeker },
    { id: "Çağdaş Altay", src: CagdasAltay },
    { id: "Erkan Özdamar", src: ErkanOzdamar },
    { id: "Halil Umut Meler", src: HalilUmutMeler },
    { id: "Hüseyin Göçek", src: HuseyinGocek },
    { id: "Kadir Sağlam", src: KadirSaglam },
    { id: "Mert Güzenge", src: MertGuzenge },
    { id: "Mete Kalkavan", src: MeteKalkavan },
    { id: "Mustafa Kürşad Filiz", src: MustafaKursadFiliz },
    { id: "Sarper Barış Saka", src: SarperBarisSaka },
    { id: "Suat Arslanboğa", src: SuatArslanboga },
    { id: "Tugay Kaan Numanoğlu", src: TugayKaanNumanoglu },
    { id: "Ümit Öztürk", src: UmitOzturk },
    { id: "Volkan Bayarslan", src: VolkanBayarslan },
    { id: "Yaşar Kemal Uğurlu", src: YasarKemalUgurlu },
    { id: "Yasin Kol", src: YasinKol },
    { id: "Zorbay Küçük", src: ZorbayKucuk },
  ];

  const [dateOfBirth, setDateOfBirth] = useState();
  const [placeOfBirth, setPlaceOfBirth] = useState();
  const [firstMatch, setFirstMatch] = useState();
  const [biography, setBiography] = useState();
  const [matchCount, setMatchCount] = useState();
  const [yellowCard, setYellowCard] = useState();
  const [yellowRedCard, setYellowRedCard] = useState();
  const [redCard, setRedCard] = useState();
  const [penalty, setPenalty] = useState();
  const [result, setResult] = useState();
  const [rank, setRank] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/referees`)
      .then((res) => {
        const referees = res.data;
        referees.forEach((element) => {
          var cleanName = element.name;
          if (cleanName === refereeName) {
            setDateOfBirth(element.dateOfBirth);
            setPlaceOfBirth(element.placeOfBirth);
            setFirstMatch(element.firstMatch);
            setBiography(element.biography);
            setMatchCount(element.matchCount);
            setYellowCard(element.yellowCard);
            setYellowRedCard(element.yellowRedCard);
            setRedCard(element.redCard);
            setPenalty(element.penalty);
            setRank(element.rank);
            var result = images.find(({ id }) => id === refereeName).src;
            setResult(result);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MainScreen title={refereeName}>
      <div>
        <div>
          <Row className="allRows">
            <Col>
              <Row className="allRows">
                <img
                  src={result}
                  style={{ height: "140px" }}
                  alt="Referee-Photo"
                ></img>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 className="subTitle">
                Personal Information of {refereeName}
              </h3>
              <Row className="allRows">
                <Col>
                  <Row className="allRows">
                    <h4>Place of Birth</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{placeOfBirth}</h5>
                  </Row>
                </Col>
                <Col>
                  <Row className="allRows">
                    <h4>Date of Birth</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{dateOfBirth}</h5>
                  </Row>
                </Col>
              </Row>
              <Row className="allRows">
                <Col>
                  <Row className="allRows">
                    <h4>First Match in Super League</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{firstMatch}</h5>
                  </Row>
                </Col>
                <Col>
                  <Row className="allRows">
                    <h4>Rank</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{rank}</h5>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col>
              <h3 className="subTitle">
                Technical Details about {refereeName}
              </h3>
              <Row className="allRows">
                <Col>
                  <Row className="allRows">
                    <h4>Number of matches</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{matchCount}</h5>
                  </Row>
                </Col>
                <Col>
                  <Row className="allRows">
                    <h4>Number of Penalties</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{penalty}</h5>
                  </Row>
                </Col>
              </Row>
              <Row className="allRows">
                <Col>
                  <Row className="allRows">
                    <h4>Number of Yellow Cards</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{yellowCard}</h5>
                  </Row>
                </Col>
                <Col>
                  <Row className="allRows">
                    <h4>Number of Red Cards</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{redCard}</h5>
                  </Row>
                </Col>
              </Row>
              <Row className="allRows">
                <Col>
                  <Row className="allRows">
                    <h4>Number of Red Cards from Yellow Cards</h4>
                  </Row>
                  <Row className="allRows">
                    <h5>{yellowRedCard}</h5>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div>
          <h3 className="subTitle-bio"> {refereeName}'s Short Biography </h3>
          <Row className="allRows">
            <Col>
              <Row>
                <h6>{biography}</h6>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </MainScreen>
  );
}
export default SingleReferee;

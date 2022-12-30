import "./RefereesScreen.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

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

function RefereesScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedReferee, setSelectedReferee] = useState("");
  const [dropdownTitle, setDropdownTitle] = useState("Sort Referees");
  const [selectedRefereeRank, setSelectedRefereeRank] = useState(0);
  const [flag, setFlag] = useState(false);
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
  const navigate = useNavigate();

  const sortByRank = async () => {
    setDropdownTitle("Sort by Rank (Most to Least)");
    axios
      .get(`${process.env.REACT_APP_URL}/api/referees/sortbyrank`)
      .then((res) => {
        const referees = res.data;
        setData(referees);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sortByName = async () => {
    setDropdownTitle("Sort by Name(Alphabetically A to Z)");
    axios
      .get(`${process.env.REACT_APP_URL}/api/referees/sortbyname`)
      .then((res) => {
        const referees = res.data;
        setData(referees);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sortByMatchCount = async () => {
    setDropdownTitle(" Sort by Match Count(Most to Least)");
    axios
      .get(`${process.env.REACT_APP_URL}/api/referees/sortbymatchcount`)
      .then((res) => {
        const referees = res.data;
        setData(referees);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sortByDefault = async () => {
    setDropdownTitle("Default (Sorted by Match Count)");
    axios
      .get(`${process.env.REACT_APP_URL}/api/referees/sortbymatchcount`)
      .then((res) => {
        const referees = res.data;
        setData(referees);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/referees`)
      .then((res) => {
        const referees = res.data;
        setData(referees);
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmitForEdit = async (e) => {
    e.preventDefault();
    setShow(false);
    let nameOfJournalist = userInfo.name;

    const dataOfRank = await axios.post(
      `${process.env.REACT_APP_URL}/api/referees/updaterankofreferee`,
      { nameOfJournalist, selectedRefereeRank, selectedReferee }
    );

    axios
      .get(`${process.env.REACT_APP_URL}/api/referees`)
      .then((res) => {
        const referees = res.data;
        console.log(referees);
        setData(referees);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return !flag ? (
    <div>
      <p></p>
      <Loading />
    </div>
  ) : (
    <div>
      <h1 className="mainTitle">Referees</h1>
      <p> </p>
      <div>
        <table style={{ marginLeft: 60 }}>
          <thead>
            <tr>
              <th>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={dropdownTitle}
                >
                  <Dropdown.Item onClick={() => sortByRank()}>
                    Sort by Rank (Most to Least)
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => sortByName()}>
                    Sort by Name(Alphabetically A to Z)
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => sortByMatchCount()}>
                    Sort by Match Count(Most to Least)
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => sortByDefault()}>
                    Default (Sorted by Match Count)
                  </Dropdown.Item>
                </DropdownButton>
              </th>
              {userInfo && userInfo.role === "journalist" ? (
                <th>
                  <Button
                    className="edit-button"
                    variant="light"
                    onClick={handleShow}
                  >
                    Rank a Referee
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        Choose the referee and the corresponding rank{" "}
                      </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <Form onSubmit={handleSubmitForEdit}>
                        <Row>
                          <Col>
                            Choose a Referee:
                            {data.map((refereeInfo) => (
                              <div key={`default-radio`} className="mb-3">
                                <Form.Group controlId="getSelectionForNameOfReferee">
                                  <Form.Check
                                    type="radio"
                                    name="belongSameRadio"
                                    id={`default-radio`}
                                    label={refereeInfo.name}
                                    value={refereeInfo.name}
                                    onChange={(e) =>
                                      setSelectedReferee(e.target.value)
                                    }
                                  />
                                </Form.Group>
                              </div>
                            ))}
                          </Col>
                          <Col>
                            Choose a Rank:
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ranks) => (
                              <div key={`default-radio`} className="mb-3">
                                <Form.Group controlId="getSelectionForRankOfReferee">
                                  <Form.Check
                                    type="radio"
                                    name="belongSameRankRadio"
                                    id={`default-radio`}
                                    label={ranks}
                                    value={ranks}
                                    onChange={(e) =>
                                      setSelectedRefereeRank(e.target.value)
                                    }
                                  />
                                </Form.Group>
                              </div>
                            ))}
                          </Col>
                        </Row>

                        <Button variant="light" type="submit">
                          Update Rank of Referee
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                </th>
              ) : (
                <></>
              )}
            </tr>
          </thead>
        </table>
      </div>
      <br></br>
      <div
        className="row row-cols-4 row-cols-md-4 g-4"
        style={{ marginLeft: 40, marginRight: 40 }}
      >
        {data.map((data) => {
          return (
            <div className="card-body text-dark">
              <Card
                className="card-body text-dark referees-card"
                style={{ width: "18rem", cursor: "pointer" }}
                onClick={() => navigate(`/referee/${data.name}`)}
              >
                <Row className="allRows">
                  <img
                    variant="top"
                    src={images.find(({ id }) => id === data.name).src}
                    height={100}
                  />
                </Row>

                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    {data.name}
                  </Card.Title>
                </Card.Body>
                <Row className="allRows"></Row>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RefereesScreen;

import "./RefereesScreen.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

function RefereesScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [data, setData] = useState([]);
  const [tableHead, setTableHead] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedReferee, setSelectedReferee] = useState("");
  const [dropdownTitle, setDropdownTitle] = useState("Sort Referees");
  const [selectedRefereeRank, setSelectedRefereeRank] = useState(0);

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
    const newHead = [
      { rank: "# Rank" },
      { name: "Referee" },
      { matchCount: "Match Count" },
      { yellowCard: "Yellow Card" },
      { yellowRedCard: "Yellow to Red Card" },
      { redCard: "Red Card" },
      { penalty: "Penalty" },
    ];
    setTableHead(newHead);
    axios
      .get(`${process.env.REACT_APP_URL}/api/referees`)
      .then((res) => {
        const referees = res.data;
        setData(referees);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmitForEdit = async (e) => {
    e.preventDefault();
    //console.log(e);
    console.log(selectedReferee);
    console.log(selectedRefereeRank);
    setShow(false);
    let nameOfJournalist = userInfo.name;
    console.log("just before axios");

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

  return (
    <div>
      <h1 className="mainTitle">Referees</h1>
      <p> </p>

      <table>
        <thead>
          <tr>
            <th>
              <DropdownButton id="dropdown-basic-button" title={dropdownTitle}>
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
      <Table responsive>
        <thead>
          <tr>
            {tableHead.map((tableHead) => {
              return (
                <th>
                  <a>{tableHead.rank}</a>
                  <a>{tableHead.name}</a>
                  <a>{tableHead.matchCount}</a>
                  <a style={{ color: "#FFE15D" }}>{tableHead.yellowCard}</a>
                  <a style={{ color: "#FF7000" }}>{tableHead.yellowRedCard}</a>
                  <a style={{ color: "red" }}>{tableHead.redCard}</a>
                  <a>{tableHead.penalty}</a>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((data) => {
            return (
              <tr>
                <td>{data.rank}</td>
                <td>
                  <a href={`/referee/${data.name}`}>{data.name}</a>
                </td>
                <td>{data.matchCount}</td>
                <td>{data.yellowCard}</td>
                <td>{data.yellowRedCard}</td>
                <td>{data.redCard}</td>
                <td>{data.penalty}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default RefereesScreen;

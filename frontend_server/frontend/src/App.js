import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [say, setSay] = useState('');
  const [sayList, setSayList] = useState([]);
  console.log(sayList);

  const fetchSayList = () => {
    fetch('http://localhost:3000/say', {
      method: 'GET'
    })
      .then(async (response) => {
        const result = await response.json();
        setSayList(result);
      });
  };

  useEffect(() => {
    fetchSayList();
  }, []);

  const onInputName = e => setName(e.target.value);
  const onInputSay = e => setSay(e.target.value);
  const onClickSubmit = async () => {
    fetch('http://localhost:3000/say', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, say })
    })
      .then(() => {
        setName('');
        setSay('');
        window.alert('방명록이 추가되었습니다.');
        fetchSayList();
      })
      .catch(err => {
        window.alert('등록에 실패하였습니다.\n오류가 반복되면 관리자에게 문의해주세요.');
      })
  };

  return (
    <div className="container">
      <h1 className="title">방명록</h1>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">당신은 누구십니까?</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
               placeholder="당신의 이름을 입력하세요." value={name} onChange={onInputName}/>
          <small id="emailHelp" className="form-text text-muted">가짜 이름을 입력하면 대머리가 됩니다.</small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">하고 싶은 말을 남겨주세요.</label>
        <textarea className="form-control" value={say} onChange={onInputSay} id="exampleFormControlTextarea1" rows="3" />
      </div>
      <button type="button" className="mybutton btn btn-primary" onClick={onClickSubmit}>추가</button>
      <table className="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">작성자</th>
          <th scope="col">내용</th>
          <th scope="col">날짜</th>
        </tr>
        </thead>
        <tbody>
          {sayList.map((sayItem, idx) => (
            <tr key={`sayItem_${idx}`}>
              <th scope="row">{sayItem.id}</th>
              <td>{sayItem.name}</td>
              <td>{sayItem.say}</td>
              <td>{sayItem.createdAt.split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { __deleteComment, __editSave, __getComment } from "../../redux/module/comments";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function CommentList({ diaryId }) {
  const [disable, setDisable] = useState(true);
  const [input, setInput] = useState({
    comment: "",
  });
  const { comments } = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const param = Number(useParams().userId);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const onDelete = (commentId) => {
    const result = window.confirm("정말 삭제하시겠습니까? 😢");
    if (!result) return;
    dispatch(__deleteComment({ commentId, diaryId }));
    Swal.fire({
      icon: "success",
      title: "삭제 완료!",
    });
    dispatch(__getComment(param));
  };

  const onEdit = () => {
    setDisable(false);
  };

  const EditSave = (commentId) => {
    dispatch(__editSave({ commentId, diaryId, ...input }));
    setDisable(true);
    Swal.fire({
      icon: "success",
      title: "수정 완료!",
    });
    dispatch(__getComment(param));
  };

  useEffect(() => {
    dispatch(__getComment(param));
  }, [dispatch, param]);

  return (
    <CommentListBox>
      {comments?.map((comm) =>
        comm.diaryId === diaryId ? (
          <div style={{ display: "flex" }} key={comm.commentId}>
            <div style={{ width: "40px", fontSize: "0.7rem", marginTop: "3px", marginLeft: "2px" }}>{comm.name}</div>
            <Comment onChange={onChange} name="comment" placeholder={comm.comment} value={input.comment} disabled={disable} />
            {disable ? (
              <CommentEdit>
                <FontAwesomeIcon onClick={onEdit} icon={faPencil} style={{ marginTop: "-1px" }} />
              </CommentEdit>
            ) : (
              <CommentEdit>
                <FontAwesomeIcon
                  onClick={() => {
                    EditSave(comm.commentId);
                  }}
                  icon={faCheck}
                  style={{ marginTop: "-1px" }}
                />
              </CommentEdit>
            )}
            {disable ? (
              <CommentDelete>
                <FontAwesomeIcon
                  onClick={() => {
                    onDelete(comm.commentId);
                  }}
                  icon={faTrashCan}
                  style={{ marginTop: "-1px" }}
                />
              </CommentDelete>
            ) : (
              <CommentDelete>
                <FontAwesomeIcon
                  onClick={() => {
                    setInput(comm.comment);
                    setDisable(true);
                  }}
                  icon={faXmark}
                  style={{ marginTop: "-1px" }}
                />
              </CommentDelete>
            )}
          </div>
        ) : null
      )}
    </CommentListBox>
  );
}

export default CommentList;

const CommentListBox = styled.div`
  width: 95%;
  height: 70px;
  margin: 5px auto auto 14px;
  padding: 5px;
  display: inline-block;
`;

const Comment = styled.input`
  width: 400px;
  height: 20px;
  padding: 2px;
  margin-bottom: 5px;
  margin-left: 10px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const CommentEdit = styled.button`
  width: 33px;
  height: 20px;
  margin-left: 20px;
  vertical-align: middle;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  font-size: 0.3rem;
`;
const CommentDelete = styled.button`
  width: 33px;
  height: 20px;
  vertical-align: middle;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  font-size: 0.3rem;
`;

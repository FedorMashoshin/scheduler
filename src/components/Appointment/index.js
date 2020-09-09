import React from "react";
import Header from "components/Appointment/header";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_EDIT = "ERROR_EDIT";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    if (interviewer && name) {
      transition(SAVING);
      props
        .bookInterview(props.id, interview)
        .then(() => {
          transition(SHOW);
        })
        .catch(error => {
          transition(ERROR_EDIT, true);
        });
    }
  }

  const showConfirmMessage = event => {
    event.preventDefault();
    transition(CONFIRM);
  };

  const editAppointment = event => {
    event.preventDefault();
    transition(EDIT);
    console.log(props.interview);
  };

  const deleteAppointment = event => {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // const closeError = event => {
  //   event.preventDefault();
  //   if (props.interview) {
  //     transition(SHOW);
  //   } else {
  //     transition(EMPTY);
  //   }
  // };

  return (
    <article data-testid='appointment' className='appointment'>
      <Header time={props.time} />

      {mode === ERROR_EDIT && (
        <Error
          onClose={back}
          message={"Sorry, we couldn't change or create provided information"}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          onClose={back}
          message={"Sorry, we couldn't delete your appointment"}
        />
      )}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure?"}
          onCancel={back}
          onConfirm={deleteAppointment}
        />
      )}

      {mode === EDIT && (
        <Form
          onCancel={back}
          onSave={save}
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}

      {mode === CREATE && (
        <Form onCancel={back} onSave={save} interviewers={props.interviewers} />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={editAppointment}
          onDelete={showConfirmMessage}
        />
      )}
    </article>
  );
}

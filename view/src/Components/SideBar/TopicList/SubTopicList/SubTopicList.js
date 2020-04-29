import React, { useState, useEffect } from 'react'


const DeleteIcon = ({ modeSettings, deleteSubTopic, clickDeleteIconHandler }) => {




	if (modeSettings === 2) {
		return (
			<div style={{position: 'absolute', left: '15px', top: '1px', borderRadius: '5px', border: '1px solid grey', width: '15px', height: '15px', cursor: 'pointer' }} onClick={clickDeleteIconHandler}>
				{
					deleteSubTopic
					&&
					<i className="delete_icon material-icons text-info" style={{ fontSize: '15px'}}>
						done
					</i>
				}
				
			</div>
		)
	} else {
		return false
	}
}

const SubTopicTitle = ({ subTopic, actualSubTopic, modeSettings }) => {
	return (
		<li
			className="list-group-item p-0 pt-0 pb-1"
			style={{background: 'none',
					border: 'none',
					fontSize: '13px',
					color: '#949494',
					cursor: 'pointer',
					marginLeft: modeSettings === 2 ? '35px' : '30px'
				}}
		>
			<span style={{color: actualSubTopic.subTopicId === subTopic.id ? '#17a2b8': ''}}>
				{subTopic.title}
			</span>
		</li>
	)
}


const SubTopic = ({ topicId, subTopic, actualSubTopic, modeSettings, deleteTopic, setActualSubTopic, setDeleteTopic, setCandidateForDeletion, unsetCandidateForDeletion }) => {
	const [deleteSubTopic, setDeleteSubTopic] = useState(false)
	useEffect(() => {
		setDeleteSubTopic(deleteTopic)
	}, [deleteTopic])

	const clickSubTopicHandler = (e) => {
		if (modeSettings !== 2) {
			setActualSubTopic(topicId, subTopic.id)
		}
	}
	const clickDeleteIconHandler = () => {
		if (deleteTopic) {
			setDeleteTopic(false)
		} else {
			setDeleteSubTopic(!deleteSubTopic)
			if (!deleteSubTopic) {
				setCandidateForDeletion(2, { topicId, subTopicId: subTopic.id })
			} else {
				unsetCandidateForDeletion(2, { topicId, subTopicId: subTopic.id })
			}
		}
	}

	return (
		<div className={(actualSubTopic.subTopicId === subTopic.id && modeSettings !== 2) ? 'actualSubTopic mt-2' : 'subTopic mt-2'} onClick={clickSubTopicHandler} style={{position: 'relative'}}>
			<DeleteIcon modeSettings={modeSettings} deleteSubTopic={deleteSubTopic} clickDeleteIconHandler={clickDeleteIconHandler}/>
			<SubTopicTitle subTopic={subTopic} actualSubTopic={actualSubTopic} modeSettings={modeSettings}/>
		</div>
	)
}

const SubTopicList = ({ topicId, subTopic, actualSubTopic, modeSettings, deleteTopic, setActualSubTopic, setDeleteTopic, setCandidateForDeletion, unsetCandidateForDeletion }) => {
	return (
		<div className="mb-2 mt-2">
			{ subTopic && subTopic.map(subTopic => <SubTopic
								topicId={topicId}
								subTopic={subTopic}
								actualSubTopic={actualSubTopic}
								modeSettings={modeSettings}
								deleteTopic={deleteTopic}
								setActualSubTopic={setActualSubTopic}key={subTopic.id}
								setDeleteTopic={setDeleteTopic}
								setCandidateForDeletion={setCandidateForDeletion}
								unsetCandidateForDeletion={unsetCandidateForDeletion}
							/>
							) }
		</div>
	)
}

export default SubTopicList
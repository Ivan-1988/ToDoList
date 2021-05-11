import React, {useState, KeyboardEvent, ChangeEvent} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')

    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'){
            onClickAddItem()
        }
    }
    const errorMessage = error
        ? <div className={'error-message'}>Title is required!</div>
        : null

    return(
        <div>
            <input className={error ? 'error' : ''}
                   value={title} //https://learn-reactjs.ru/basics/forms
                   onChange={onChangeTitle}
                   onKeyPress={onKeyPressAddItem}
            />
            <button onClick={onClickAddItem}>+</button>
            {errorMessage}
        </div>
    )
}

export default AddItemForm;
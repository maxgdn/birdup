import * as React from 'react';
import styled from 'styled-components';
import {colors, useStores} from '../../core';
import {useEffect, useState} from 'react';
import { observer } from 'mobx-react'
import {Button} from '../../components';
import { FormAdd } from 'grommet-icons';

const Container = styled.div`
    display: flex;
    align-items: center;
    & > * {
        margin: 0.2rem;
    }
`;

const Input = styled.input`
    height: 50%;
`;

const Label = styled.label`

`;

const BirdCreate: React.FC = observer(() => {
    const [name, setName] = useState("");
    const [genusName, setGenusName] = useState("");
    const {birdStore} = useStores();

    const submit = async () => {
        await birdStore.create(genusName, name);
        setName("");
        setGenusName("");
    }

    return (
        <Container>
            <Label>Name: </Label>
            <Input value={name} onChange={e => setName(e.target.value)} type={'text'} placeholder={"Enter in a Bird's Name"}/>
            <Label>Genus: </Label>
            <Input value={genusName} onChange={e => setGenusName(e.target.value)} type={'text'} placeholder={"Enter in the Bird's Genus"}/>
            <Button name={"Add"} icon={<FormAdd/>} onClick={() => submit()}/>
        </Container>
    );
});

export default BirdCreate;
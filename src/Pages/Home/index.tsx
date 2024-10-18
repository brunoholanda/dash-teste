import React, { useState, useEffect } from 'react';
import { Statistic, Tooltip } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import * as S from './styles';

interface EmissorData {
    paraGerar: number;
    pdfGerado: number;
    smsParaEnviar: number;
    smsEnviado: number;
    emailParaEnviar: number;
    emailEnviado: number;
}

interface MockData {
    date: string;
    [key: string]: EmissorData | string;
}

interface TableRow {
    key: string;
    emissor: string;
    totalFaturas: number;
    pdfGerados: number;
    smsParaEnviar: number;
    smsEnviados: number;
    emailsParaEnviar: number;
    emailsEnviados: number;
    status: React.ReactNode;
    isRedRow: boolean;
}

const Home: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD'));
    const [mockData, setMockData] = useState<MockData | null>(null);
    const [cardsData, setCardsData] = useState({
        totalFaturas: 0,
        pdfGerados: 0,
        smsParaEnviar: 0,
        smsEnviados: 0,
        emailsParaEnviar: 0,
        emailsEnviados: 0
    });
    const [tableData, setTableData] = useState<TableRow[]>([]);

    // Função para carregar os dados mock
    const loadMockData = async (date: string) => {
        try {
            const response = await fetch(`mock/${date}.json`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMockData(data);
        } catch (error) {
            console.error('Error loading mock data:', error);
            setMockData(null);
        }
    };

    // Atualiza os dados sempre que o mockData ou a data selecionada mudar
    useEffect(() => {
        if (mockData) {
            let totalFaturas = 0;
            let pdfGerados = 0;
            let smsParaEnviar = 0;
            let smsEnviados = 0;
            let emailsParaEnviar = 0;
            let emailsEnviados = 0;
            const tableRows: TableRow[] = [];

            Object.keys(mockData).forEach((emissor) => {
                if (emissor !== 'date') {
                    const emissorData = mockData[emissor] as EmissorData;
                    totalFaturas += emissorData.paraGerar;
                    pdfGerados += emissorData.pdfGerado;
                    smsParaEnviar += emissorData.smsParaEnviar;
                    smsEnviados += emissorData.smsEnviado;
                    emailsParaEnviar += emissorData.emailParaEnviar;
                    emailsEnviados += emissorData.emailEnviado;

                    const diffPercent = ((emissorData.smsParaEnviar - emissorData.smsEnviado) / emissorData.smsParaEnviar) * 100;

                    const isRedRow = diffPercent > 10;

                    const status = isRedRow ? (
                        <Tooltip title={`Envios abaixo da margem de erro estipulada 10% (${diffPercent.toFixed(2)}% de diferença)`}>
                            <CloseCircleOutlined style={{ color: 'red', fontSize: '20px' }} />
                        </Tooltip>
                    ) : (
                        <Tooltip title={`Envios dentro da margem (${diffPercent.toFixed(2)}% de diferença)`}>
                            <CheckCircleOutlined style={{ color: 'green', fontSize: '20px' }} />
                        </Tooltip>
                    );

                    tableRows.push({
                        key: emissor,
                        emissor,
                        totalFaturas: emissorData.paraGerar,
                        pdfGerados: emissorData.pdfGerado,
                        smsParaEnviar: emissorData.smsParaEnviar,
                        smsEnviados: emissorData.smsEnviado,
                        emailsParaEnviar: emissorData.emailParaEnviar,
                        emailsEnviados: emissorData.emailEnviado,
                        status,
                        isRedRow
                    });
                }
            });

            setCardsData({
                totalFaturas,
                pdfGerados,
                smsParaEnviar,
                smsEnviados,
                emailsParaEnviar,
                emailsEnviados
            });
            setTableData(tableRows);
        }
    }, [mockData]); // Atualiza ao mudar o mockData

    // Efeito para carregar os dados quando a data mudar
    useEffect(() => {
        loadMockData(selectedDate); // Carrega os dados quando a data mudar
    }, [selectedDate]);

    const handleDateChange = (date: moment.Moment | null) => {
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            setSelectedDate(formattedDate); // Atualiza a data e carrega os dados automaticamente
        }
    };

    const columns = [
        {
            title: 'Emissor',
            dataIndex: 'emissor',
            key: 'emissor',
        },
        {
            title: 'Total de Faturas Para Gerar',
            dataIndex: 'totalFaturas',
            key: 'totalFaturas',
            render: (value: number) => value.toLocaleString('pt-BR')
        },
        {
            title: 'PDF de faturas gerados',
            dataIndex: 'pdfGerados',
            key: 'pdfGerados',
            render: (value: number) => value.toLocaleString('pt-BR')
        },
        {
            title: 'SMS\'s para enviar',
            dataIndex: 'smsParaEnviar',
            key: 'smsParaEnviar',
            render: (value: number) => value.toLocaleString('pt-BR')
        },
        {
            title: 'SMS\'s enviados',
            dataIndex: 'smsEnviados',
            key: 'smsEnviados',
            render: (value: number) => value.toLocaleString('pt-BR')
        },
        {
            title: 'Emails para enviar',
            dataIndex: 'emailsParaEnviar',
            key: 'emailsParaEnviar',
            render: (value: number) => value.toLocaleString('pt-BR')
        },
        {
            title: 'Emails enviados',
            dataIndex: 'emailsEnviados',
            key: 'emailsEnviados',
            render: (value: number) => value.toLocaleString('pt-BR')
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        }
    ];

    return (
        <>
            <S.Header>
                <S.Title>Relatório Diário de Faturas x Envios</S.Title>
                <div className='controls'>
                    <p>Escolha uma data para filtrar</p>
                    <S.StyledDatePicker
                        format="DD/MM/YYYY"
                        style={{ marginRight: '10px' }}
                        //@ts-expect-error for work
                        onChange={handleDateChange} // Atualiza a data diretamente no seletor
                    />
                </div>
            </S.Header>

            <S.Container>
                <S.StyledCardRow>
                    <S.StyledCard>
                        <Statistic title="Total de Faturas Para Gerar" value={cardsData.totalFaturas.toLocaleString('pt-BR')} />
                    </S.StyledCard>
                    <S.StyledCard>
                        <Statistic title="PDF de faturas gerados" value={cardsData.pdfGerados.toLocaleString('pt-BR')} />
                    </S.StyledCard>
                    <S.StyledCard>
                        <Statistic title="SMS's para enviar" value={cardsData.smsParaEnviar.toLocaleString('pt-BR')} />
                    </S.StyledCard>
                    <S.StyledCard>
                        <Statistic title="SMS's enviados" value={cardsData.smsEnviados.toLocaleString('pt-BR')} />
                    </S.StyledCard>
                    <S.StyledCard>
                        <Statistic title="Emails para enviar" value={cardsData.emailsParaEnviar.toLocaleString('pt-BR')} />
                    </S.StyledCard>
                    <S.StyledCard>
                        <Statistic title="Emails enviados" value={cardsData.emailsEnviados.toLocaleString('pt-BR')} />
                    </S.StyledCard>
                </S.StyledCardRow>
                <S.Legend>*Linhas em vermelho possuem envios 10% menores do que o numero de faturas para enviar</S.Legend>
                <S.Legend>*Passe o mouse na coluna status para mais detalhes</S.Legend>

                <S.StyledTable
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    rowClassName={(record) => {
                        const row = record as TableRow;
                        return row.isRedRow ? 'red-row' : '';
                    }}
                />
            </S.Container>

            <S.Footer>
                <p>© Elevaty 2024</p>
            </S.Footer>
        </>
    );
};

export default Home;

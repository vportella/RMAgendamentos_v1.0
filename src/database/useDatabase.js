import { Alert } from "react-native"

const TABLES = {
    USUARIOS: 'usuarios',
    ENDERECOS: 'enderecos',
    ARQUITETOS: 'arquitetos',
    AGENDAMENTOS: 'agendamentos'
};

export async function initDatabase(db) {
    try {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS ${TABLES.USUARIOS} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                senha TEXT NOT NULL
            );`);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS ${TABLES.ENDERECOS} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                usuario_id INTEGER NOT NULL,
                endereco TEXT NOT NULL,
                complemento TEXT,
                bairro TEXT NOT NULL,
                cidade TEXT NOT NULL,
                uf TEXT NOT NULL,
                cep TEXT NOT NULL,
                FOREIGN KEY (usuario_id) REFERENCES ${TABLES.USUARIOS}(id)
            );`);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS ${TABLES.ARQUITETOS} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL
            );`);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS ${TABLES.AGENDAMENTOS} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                usuario_id INTEGER NOT NULL,
                endereco_id INTEGER NOT NULL,
                arquiteto_id INTEGER NOT NULL,
                data DATE NOT NULL,
                hora TIME NOT NULL,
                FOREIGN KEY (usuario_id) REFERENCES ${TABLES.USUARIOS}(id),
                FOREIGN KEY (endereco_id) REFERENCES ${TABLES.ENDERECOS}(id),
                FOREIGN KEY (arquiteto_id) REFERENCES ${TABLES.ARQUITETOS}(id)
            );`);
 
        await createArquiteto(db);
        console.log('Banco de dados inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar banco de dados:', error);
        Alert.alert('Erro', 'Não foi possível inicializar o banco de dados');
    }
}

export async function verifyUser(db, email, senha) {
    try {
        const userExists = await db.getFirstAsync(
            `SELECT * FROM ${TABLES.USUARIOS} WHERE email = ?`,
            [email]
        );
        if (!userExists) {
            Alert.alert("Usuário não cadastrado!");
            return {
                success: false,
                user: null
            };
        }

        const user = await db.getFirstAsync(
            `SELECT * FROM ${TABLES.USUARIOS} WHERE email = ? AND senha = ?`,
            [email, senha]
        );

        if (user) {
            return {
                success: true,
                user: user
            }
        } else {
            Alert.alert("Email ou senha incorretos!");
            return {
                success: false,
                user: null
            }
        }
    } catch (error){
        Alert.alert("Erro", "Ocorreu um problema ao realizar o login.");
        return {
            success: false,
            user: null
        }
    }
}

export async function createUsuario(db, nome, email, senha) {
    try {

        const result = await db.runAsync(`INSERT INTO ${TABLES.USUARIOS} (nome, email, senha) VALUES (?, ?, ?)`,
            [nome, email, senha]);
        
        if (result) {
            const newUser = await db.getFirstAsync(
                `SELECT * FROM ${TABLES.USUARIOS} WHERE id = ?`,
                [result.lastInsertRowId]
            );
            return {
                success: true,
                user: newUser
            }
        } else {
            return {
                success: false,
                user: null
            }
        }    
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        if (error.message.includes('UNIQUE constraint failed')) {
            Alert.alert('Aviso!', 'Este email já está cadastrado');
        } else {
            Alert.alert('Erro', 'Não foi possível criar o usuário');
        }
        return {
            success: false,
            user: null
        }
    }
}

export async function createEndereco(db, {usuario_id, endereco, complemento, bairro, cidade, uf, cep}) {
    try {

        const result = await db.runAsync(
            `INSERT INTO ${TABLES.ENDERECOS} (usuario_id, endereco, complemento, bairro, cidade, uf, cep) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [usuario_id, endereco, complemento, bairro, cidade, uf, cep]
        );
        
        if (result) {
            const newEndereco = await db.getFirstAsync(
                `SELECT * FROM ${TABLES.ENDERECOS} WHERE id = ?`,
                [result.lastInsertRowId]
            );
            return {
                success: true,
                endereco: newEndereco,
                endereco_id: result.lastInsertRowId
            };
        }
        return { 
            success: false,
            error: 'Falha ao inserir endereço'
        };
    } catch (error) {
        console.error('Erro ao criar endereço:', error);
        return { 
            success: false,
            error: error.message
        };
    }
}

export async function createArquiteto(db) {
    try {
        const result = await db.getAllAsync(`SELECT * FROM ${TABLES.ARQUITETOS}`);

        // Se já existirem arquitetos, retorna os existentes
        if (result && result.length > 0) {
            console.log('Arquitetos já existem no banco');
            return result;
        }

        const arquitetos = [
            "Arquiteta Patricia Knop",
            "Arquiteta Amanda Oliveira",
            "Arquiteta Nathalia Mamede"
        ];

        for (const arq of arquitetos) {
            await db.runAsync(
                `INSERT INTO ${TABLES.ARQUITETOS} (nome) VALUES (?)`,
                [arq]);
        }
        const newResult = await db.getAllAsync(`SELECT * FROM ${TABLES.ARQUITETOS}`);
        return newResult;
    } catch (error) {
        console.error('Erro ao criar arquitetos:', error);
        Alert.alert('Erro', 'Não foi possível criar os arquitetos');
        return null;
    }
}

export async function createAgendamento(db, {usuario_id, endereco_id, arquiteto_id, data, hora}) {
    try {

        const result = await db.runAsync(
            `INSERT INTO ${TABLES.AGENDAMENTOS} 
            (usuario_id, endereco_id, arquiteto_id, data, hora) 
            VALUES (?, ?, ?, ?, ?)`,
            [usuario_id, endereco_id, arquiteto_id, data, hora]
        );
        
        if (result) {
            const newAgendamento = await db.getFirstAsync(
                `SELECT * FROM ${TABLES.AGENDAMENTOS} WHERE id = ?`,
                [result.lastInsertRowId]
            );
            return {
                success: true,
                agendamento: newAgendamento,
                agendamento_id: result.lastInsertRowId
            };
        }
        return { 
            success: false,
            error: 'Falha ao inserir agendamento'
        };
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        Alert.alert('Erro', 'Não foi possível criar o agendamento');
        return { 
            success: false,
            error: error.message
        };
    }
}

export async function getEnderecoByUsuarioId(db, usuario_id) {
    try {

        const endereco = await db.getFirstAsync(
            `SELECT * FROM ${TABLES.ENDERECOS} WHERE usuario_id = ?`,
            [usuario_id]
        );

        if (endereco) {
            return {
                success: true,
                endereco_id: endereco.id
            };
        } else {
            Alert.alert('Aviso!', 'Nenhum endereço encontrado para este usuário');
            return {
                success: false,
                endereco_id: null
            };
        }
    } catch (error) {
        console.error('Erro ao buscar endereço:', error);
        Alert.alert('Erro', 'Não foi possível recuperar o endereço');
        return {
            success: false,
            endereco_id: null
        };
    }
}

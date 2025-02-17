import { $Enums } from ".prisma/client"
import { Decimal, DecimalJsLike } from "@prisma/client/runtime/library"

export type Cliente = {
    id?: string
    nome: string
    cpf?: string | null
    cnpj?: string | null
    fixo?: string | null
    celular?: string | null
    saldo: Decimal | DecimalJsLike | number | string
    create: {
        Endereco: {
            id?: string
            cep: string
            logradouro: string
            numero: number
            complemento: string
            bairro: string
            cidade: string
            uf?: $Enums.UF
        };
        email: {
            id?: string

        }
    }
}
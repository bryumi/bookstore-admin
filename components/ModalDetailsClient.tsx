import { IClient } from "@/types/clients.interface";
import { dateBr } from "@/utils/masks";

export default function ModalDetailsClient({
  onClose,
  data,
}: {
  onClose: () => void;
  data: IClient;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-800 border border-dark-600 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6 border-b border-dark-600">
          <h2 className="text-2xl font-display font-bold text-white">
            Detalhes do Cliente
          </h2>
        </div>

        <div className="p-6 space-y-4 max-h-90vh overflow-auto">
          <div>
            <div className="block text-sm font-medium text-gray-400 mb-2">
              Nome
            </div>
            <p className="text-base text-zinc-300">{data?.name}</p>
          </div>

          <div>
            <div className="block text-sm font-medium text-gray-400 mb-2">
              Genero
            </div>
            <p className="text-base text-zinc-300">
              {data?.gender === "female"
                ? "Feminino"
                : data?.gender === "male"
                  ? "Masculino"
                  : "Outro"}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="block text-sm font-medium text-gray-400 mb-2">
                Data de Nascimento
              </div>
              <p className="text-base text-zinc-300">
                {" "}
                {dateBr(data.dateBirth)}
              </p>
            </div>

            <div>
              <div className="block text-sm font-medium text-gray-400 mb-2">
                CPF
              </div>
              <p className="text-base text-zinc-300">{data.cpf}</p>
            </div>
            <div>
              <div className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </div>
              <p className="text-base text-zinc-300">{data.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="block text-sm font-medium text-gray-400 mb-2">
                Tipo de telefone
              </div>
              <p className="text-base text-zinc-300">{data.phoneType}</p>
            </div>
            <div>
              <div className="block text-sm font-medium text-gray-400 mb-2">
                DDD
              </div>
              <p className="text-base text-zinc-300">{data.phoneDDD}</p>
            </div>

            <div>
              <div className="block text-sm font-medium text-gray-400 mb-2">
                Telefone
              </div>
              <p className="text-base text-zinc-300">{data.phoneNumber}</p>
            </div>
          </div>
          <h2 className="text-xl font-display font-bold text-white">
            Endereço
          </h2>
          {data?.addresses.map((address, index) => (
            <div className="m-4">
              <h2 className="text-xl font-display font-bold text-white py-2">
                Endereço {index + 1}
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    Apelido do endereço
                  </div>
                  <p className="text-base text-zinc-300">
                    {address?.addressNickname}
                  </p>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    Tipo de residência
                  </div>
                  <p className="text-base text-zinc-300">
                    {address?.typeResidence}
                  </p>
                </div>

                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    CEP
                  </div>
                  <p className="text-base text-zinc-300">{address?.cep}</p>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    Tipo de logradouro
                  </div>
                  <p className="text-base text-zinc-300">
                    {address?.typeStreet}
                  </p>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    Logradouro
                  </div>
                  <p className="text-base text-zinc-300">{address?.street}</p>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    Bairro
                  </div>
                  <p className="text-base text-zinc-300">
                    {address?.neighborhood}
                  </p>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    Número
                  </div>
                  <p className="text-base text-zinc-300">{address?.number}</p>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    Cidade
                  </div>
                  <p className="text-base text-zinc-300">{address?.city}</p>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    Estado
                  </div>
                  <p className="text-base text-zinc-300">{address?.state}</p>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    País
                  </div>
                  <p className="text-base text-zinc-300">{address?.country}</p>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    Complemento
                  </div>
                  <p className="text-base text-zinc-300">{address?.obs}</p>
                </div>
              </div>
            </div>
          ))}
          <h2 className="text-xl font-display font-bold text-white">Cartões</h2>
          {data?.creditCard.map((card, index) => (
            <div className="m-4">
              <h2 className="text-xl font-display font-bold text-white py-2">
                Cartão {index + 1}
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    Apelido do cartão
                  </div>
                  <p className="text-base text-zinc-300">{card?.cardName}</p>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    Nome do titular
                  </div>
                  <p className="text-base text-zinc-300">
                    {card?.cardHolderName}
                  </p>
                </div>

                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    Número do cartão
                  </div>
                  <p className="text-base text-zinc-300">{card?.cardNumber}</p>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    Validade
                  </div>
                  <p className="text-base text-zinc-300">
                    {card?.cardExpirationDate}
                  </p>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    Bandeira
                  </div>
                  <p className="text-base text-zinc-300">{card?.cardFlag}</p>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-400 mb-2">
                    CVV
                  </div>
                  <p className="text-base text-zinc-300">
                    {card?.securityCode}
                  </p>
                </div>
                {card?.isMainCard && (
                  <div>
                    <div className="block text-sm font-medium text-gray-400 mb-2">
                      Preferencial
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              className="btn-success flex-1"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

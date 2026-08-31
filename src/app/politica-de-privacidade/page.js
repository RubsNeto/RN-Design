import Legal from '../../components/Legal';
import {
    COMPANY_NAME,
    LAST_UPDATED,
    WHATSAPP_LINK,
    WHATSAPP_NUMBER,
} from '../../config/site';

export const metadata = {
    title: 'Política de Privacidade',
    description:
        'Como a RN Design coleta, utiliza, compartilha e protege dados pessoais, incluindo os dados tratados nas integrações com a Plataforma WhatsApp Business.',
};

export default function PoliticaDePrivacidade() {
    return (
        <Legal
            title="Política de Privacidade"
            updatedAt={LAST_UPDATED}
            intro={`Este documento explica como a ${COMPANY_NAME} trata dados pessoais em seu site e nas soluções de atendimento e automação que operam sobre a Plataforma WhatsApp Business, em conformidade com a Lei nº 13.709/2018 (LGPD) e com as políticas da Meta Platforms.`}
        >
            <h2 id="quem-somos">1. Quem somos</h2>
            <p>
                A <strong>{COMPANY_NAME}</strong> atua com design, desenvolvimento web e
                implantação de soluções de atendimento digital, incluindo integrações com a
                Plataforma WhatsApp Business (WhatsApp Business API), disponibilizada pela
                Meta Platforms, Inc.
            </p>
            <p>
                Para os fins da LGPD, a {COMPANY_NAME} atua como{' '}
                <strong>controladora</strong> quanto aos dados de seus próprios visitantes,
                interessados e clientes; e como <strong>operadora</strong> quanto aos dados
                que trata em nome de clientes contratantes, quando estes definem as
                finalidades do tratamento em suas próprias comunicações com o público.
            </p>

            <h2 id="definicoes">2. Definições</h2>
            <ul>
                <li>
                    <strong>Dado pessoal:</strong> informação relacionada a pessoa natural
                    identificada ou identificável.
                </li>
                <li>
                    <strong>Titular:</strong> a pessoa natural a quem se referem os dados
                    pessoais.
                </li>
                <li>
                    <strong>Tratamento:</strong> toda operação com dados pessoais, como
                    coleta, uso, acesso, armazenamento, compartilhamento e eliminação.
                </li>
                <li>
                    <strong>Controlador e Operador:</strong> respectivamente, quem decide
                    sobre o tratamento e quem o realiza em nome do controlador.
                </li>
                <li>
                    <strong>Plataforma WhatsApp Business:</strong> conjunto de interfaces e
                    serviços da Meta que permite o envio e o recebimento de mensagens
                    empresariais pelo WhatsApp.
                </li>
            </ul>

            <h2 id="dados-tratados">3. Quais dados tratamos</h2>

            <h3>3.1. Dados que você nos fornece</h3>
            <ul>
                <li>
                    Dados de contato e identificação: nome, número de telefone, endereço de
                    e-mail e empresa.
                </li>
                <li>
                    Conteúdo das mensagens que você nos envia por WhatsApp, formulários ou
                    redes sociais, incluindo arquivos, imagens e áudios anexados.
                </li>
                <li>
                    Informações comerciais necessárias para orçamento, contratação e suporte.
                </li>
            </ul>

            <h3>3.2. Dados coletados automaticamente</h3>
            <ul>
                <li>
                    Dados técnicos de navegação: endereço IP, tipo e versão do navegador,
                    sistema operacional, idioma, páginas visitadas, data e hora do acesso.
                </li>
                <li>
                    Identificadores de cookies e tecnologias semelhantes, conforme a seção 7.
                </li>
            </ul>

            <h3>3.3. Dados tratados na Plataforma WhatsApp Business</h3>
            <p>
                Quando você inicia uma conversa com um número atendido por soluções que
                implantamos ou operamos, tratamos:
            </p>
            <ul>
                <li>
                    <strong>Número de telefone</strong> e <strong>nome de perfil</strong>{' '}
                    exibido no WhatsApp.
                </li>
                <li>
                    <strong>Conteúdo das mensagens</strong> trocadas com a empresa, incluindo
                    texto, mídias, documentos, localização e mensagens de voz.
                </li>
                <li>
                    <strong>Metadados de atendimento:</strong> data e hora de envio e de
                    entrega, status de leitura, protocolo, fila, setor e identificação do
                    atendente responsável.
                </li>
                <li>
                    <strong>Registros de consentimento (opt-in e opt-out)</strong>,
                    necessários para comprovar a autorização de recebimento de mensagens e
                    para atender às políticas da Meta.
                </li>
            </ul>
            <p>
                Não temos acesso ao conteúdo de conversas das quais o número empresarial não
                participa. A criptografia de ponta a ponta e o funcionamento do aplicativo
                WhatsApp são responsabilidade da Meta e regidos pelas políticas dela.
            </p>

            <h2 id="finalidades">4. Finalidades e bases legais</h2>
            <ul>
                <li>
                    <strong>Responder solicitações e prestar atendimento</strong> — execução
                    de contrato ou de procedimentos preliminares a pedido do titular (art. 7º,
                    V, LGPD).
                </li>
                <li>
                    <strong>Executar os serviços contratados</strong>, incluindo implantação,
                    automação de fluxos e suporte técnico — execução de contrato (art. 7º, V).
                </li>
                <li>
                    <strong>Enviar comunicações de marketing e novidades</strong> —
                    consentimento do titular (art. 7º, I), revogável a qualquer momento.
                </li>
                <li>
                    <strong>Melhorar o site, a segurança e a qualidade do atendimento</strong>{' '}
                    — legítimo interesse (art. 7º, IX), com avaliação de impacto e mitigação
                    de riscos ao titular.
                </li>
                <li>
                    <strong>Prevenir fraudes e abusos</strong> e garantir a segurança das
                    contas e integrações — legítimo interesse (art. 7º, IX).
                </li>
                <li>
                    <strong>Cumprir obrigações legais, regulatórias e ordens de autoridade</strong>{' '}
                    — art. 7º, II, e art. 7º, VI, LGPD.
                </li>
            </ul>

            <h2 id="dados-meta">5. Uso de dados obtidos das plataformas da Meta</h2>
            <p>
                As integrações que operamos utilizam dados da Plataforma WhatsApp Business
                exclusivamente para viabilizar a comunicação entre a empresa e seus
                contatos. Especificamente, declaramos que:
            </p>
            <ul>
                <li>
                    Não vendemos, alugamos nem cedemos dados obtidos das plataformas da Meta a
                    terceiros.
                </li>
                <li>
                    Não utilizamos esses dados para publicidade direcionada, para construir
                    perfis com finalidade publicitária, nem para alimentar bases de dados de
                    terceiros.
                </li>
                <li>
                    Não utilizamos esses dados para decisões sobre crédito, seleção de
                    emprego, seguros, moradia ou benefícios.
                </li>
                <li>
                    Utilizamos os dados apenas na medida necessária às finalidades descritas
                    na seção 4 e nos termos das políticas para desenvolvedores da Meta.
                </li>
                <li>
                    Mantemos medidas técnicas e administrativas para proteger esses dados e
                    os eliminamos quando deixam de ser necessários, conforme a seção 8.
                </li>
            </ul>

            <h2 id="compartilhamento">6. Com quem compartilhamos</h2>
            <p>
                Não comercializamos dados pessoais. O compartilhamento ocorre apenas quando
                necessário e limitado ao mínimo indispensável:
            </p>
            <ul>
                <li>
                    <strong>Meta Platforms:</strong> imprescindível para a transmissão das
                    mensagens pela Plataforma WhatsApp Business.
                </li>
                <li>
                    <strong>Provedores de infraestrutura e software:</strong> hospedagem,
                    banco de dados, armazenamento em nuvem, envio de e-mail e ferramentas de
                    análise, contratados sob obrigações de confidencialidade e segurança.
                </li>
                <li>
                    <strong>Clientes contratantes:</strong> quando atuamos como operadora, os
                    dados do atendimento são acessíveis à empresa titular do número de
                    WhatsApp, que é a controladora daquela relação.
                </li>
                <li>
                    <strong>Autoridades públicas:</strong> mediante requisição legal, ordem
                    judicial ou para exercício regular de direitos.
                </li>
            </ul>

            <h2 id="cookies">7. Cookies e tecnologias semelhantes</h2>
            <p>
                Utilizamos cookies estritamente necessários ao funcionamento do site. Caso
                venhamos a adotar cookies de desempenho, análise ou publicidade, esta
                política será atualizada e, quando exigido pela legislação, solicitaremos o
                seu consentimento previamente. Você pode bloquear ou remover cookies nas
                configurações do seu navegador; alguns recursos podem deixar de funcionar
                corretamente.
            </p>

            <h2 id="retencao">8. Por quanto tempo guardamos</h2>
            <ul>
                <li>
                    <strong>Histórico de atendimento e mensagens:</strong> pelo prazo da
                    relação com o cliente contratante e, após o encerramento, pelos prazos
                    prescricionais aplicáveis ao exercício regular de direitos, salvo
                    instrução diversa da empresa controladora.
                </li>
                <li>
                    <strong>Dados de contato para prospecção:</strong> até a revogação do
                    consentimento ou o pedido de descadastramento.
                </li>
                <li>
                    <strong>Registros de acesso à aplicação:</strong> 6 (seis) meses, nos
                    termos do art. 15 do Marco Civil da Internet (Lei nº 12.965/2014).
                </li>
                <li>
                    <strong>Dados fiscais e contratuais:</strong> pelos prazos exigidos pela
                    legislação aplicável.
                </li>
            </ul>
            <p>
                Encerrados os prazos e as finalidades, os dados são eliminados ou
                anonimizados de forma segura.
            </p>

            <h2 id="exclusao-de-dados">9. Como solicitar a exclusão dos seus dados</h2>
            <p>
                Para pedir a eliminação dos dados pessoais associados ao seu número de
                telefone ou ao seu contato:
            </p>
            <ul>
                <li>
                    Envie uma mensagem para{' '}
                    <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp da ${COMPANY_NAME} (abre em nova aba)`}
                    >
                        {WHATSAPP_NUMBER}
                    </a>{' '}
                    com o assunto <strong>Exclusão de dados</strong>.
                </li>
                <li>
                    Informe o número de telefone ou o e-mail utilizado no contato, para que
                    possamos localizar os registros.
                </li>
                <li>
                    Confirmada a sua identidade, concluímos a exclusão em até{' '}
                    <strong>15 (quinze) dias</strong> e enviamos a confirmação pelo mesmo
                    canal.
                </li>
            </ul>
            <p>
                Podemos reter parcelas mínimas dos dados quando houver obrigação legal de
                guarda ou necessidade de exercício regular de direitos, informando a você o
                motivo e o prazo.
            </p>

            <h2 id="seguranca">10. Segurança da informação</h2>
            <p>
                Adotamos medidas técnicas e administrativas compatíveis com o risco para
                proteger os dados pessoais de acessos não autorizados e de situações
                acidentais ou ilícitas de destruição, perda, alteração ou difusão, incluindo
                o tráfego cifrado por HTTPS/TLS e o controle de acesso por credenciais
                individuais. Nenhum sistema é totalmente imune a incidentes; caso ocorra
                incidente de segurança relevante, comunicaremos os titulares e a Autoridade
                Nacional de Proteção de Dados (ANPD) nos termos da LGPD.
            </p>

            <h2 id="direitos">11. Seus direitos como titular</h2>
            <p>Nos termos do art. 18 da LGPD, você pode solicitar:</p>
            <ul>
                <li>Confirmação da existência de tratamento e acesso aos seus dados.</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
                <li>
                    Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos
                    ou tratados em desconformidade com a lei.
                </li>
                <li>Portabilidade a outro fornecedor, observada a regulamentação.</li>
                <li>
                    Eliminação dos dados tratados com base no consentimento, ressalvadas as
                    hipóteses legais de conservação.
                </li>
                <li>Informação sobre as entidades com as quais compartilhamos dados.</li>
                <li>
                    Revogação do consentimento e oposição a tratamento fundado em legítimo
                    interesse.
                </li>
            </ul>
            <p>
                As solicitações são feitas pelo WhatsApp{' '}
                <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp da ${COMPANY_NAME} (abre em nova aba)`}
                >
                    {WHATSAPP_NUMBER}
                </a>{' '}
                e respondidas em até 15 (quinze) dias. Quando atuarmos como operadora,
                encaminharemos o pedido à empresa controladora e auxiliaremos no
                atendimento.
            </p>

            <h2 id="transferencia-internacional">12. Transferência internacional</h2>
            <p>
                Alguns provedores de infraestrutura e a própria Meta podem processar dados
                fora do Brasil. Nesses casos, exigimos garantias contratuais adequadas e
                observamos os requisitos dos arts. 33 a 36 da LGPD.
            </p>

            <h2 id="criancas">13. Crianças e adolescentes</h2>
            <p>
                Nossos serviços não são direcionados a menores de 18 anos e não coletamos
                intencionalmente dados de crianças e adolescentes. Identificado esse
                tratamento sem o devido amparo legal, os dados serão eliminados.
            </p>

            <h2 id="alteracoes">14. Alterações desta política</h2>
            <p>
                Esta política pode ser atualizada para refletir mudanças legais, técnicas ou
                de negócio. A data de última atualização no topo da página indica a versão
                vigente. Alterações relevantes serão comunicadas pelos canais de contato.
            </p>

            <h2 id="contato">15. Contato</h2>
            <p>
                Dúvidas, solicitações ou reclamações sobre privacidade e proteção de dados
                podem ser encaminhadas para a {COMPANY_NAME} pelo WhatsApp{' '}
                <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp da ${COMPANY_NAME} (abre em nova aba)`}
                >
                    {WHATSAPP_NUMBER}
                </a>
                .
            </p>
            <p>
                Esta política é regida pela legislação brasileira, em especial pela Lei nº
                13.709/2018 (LGPD). Você também pode apresentar reclamação à Autoridade
                Nacional de Proteção de Dados (ANPD).
            </p>
        </Legal>
    );
}

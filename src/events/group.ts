import {Client, LocalAuth, Message} from 'whatsapp-web.js';
import * as fs from 'fs';
import * as path from 'path';

const client = new Client({
    puppeteer: {
    },
    authStrategy: new LocalAuth(),
});

const targetGroupIDs = ['Ht6BhCBLV1qAz7wsvI5joQ', 'EMRP16FAzqtHLcAt1QR9Ct', 'grubun_idsi_C'];

client.on('message', async (message: Message) => {
    const messageContent = message.body;

    if (targetGroupIDs.includes(message.from)) {
        if (!messageContent.startsWith('/')) {
            const company = getCompanyFromGroupID(message.from);
            if (company) {
                const companyMembers = getCompanyMembers(company);
                sendToCompanyMembers(messageContent, companyMembers, message.from);
            }
        }
    }
});

function getCompanyFromGroupID(from: string): string | undefined {
    // Belirli WhatsApp gruplarının ID'leri ve şirketlerin eşleşmesi
    const companyGroups: Record<string, string> = {
        'group1': 'group1.json',
        'group2': 'group2.json',
        'group3': 'group3.json',
    };

    return companyGroups[from];
}

function getCompanyMembers(company: string): string[] {
    // Şirketin çalışanlarının bulunduğu JSON dosyasını oku
    let companyMembers: string[] = [];
    try {
        const companyMembersPath = path.join(__dirname, `../../${company}.json`);
        if (fs.existsSync(companyMembersPath)) {
            const companyMembersContent = fs.readFileSync(companyMembersPath, 'utf-8');
            companyMembers = JSON.parse(companyMembersContent);
        }
    } catch (error) {
        console.error('Dosya okuma hatası:', error.message);
    }

    return companyMembers;
}

async function sendToCompanyMembers(message: string, companyMembers: string[], from: string) {
    for (const companyMember of companyMembers) {
        try {
            // Burada her bir çalışana mesaj gönderme işlemi yapabilirsiniz.
            await client.sendMessage(`${companyMember}@c.us`, message);
            console.log(`"${message}" mesajı, ${companyMember} kişisine gönderildi.`);
        } catch (error) {
            console.error(`Mesaj gönderme hatası: ${error.message}`);
        }
    }
}

client.initialize();

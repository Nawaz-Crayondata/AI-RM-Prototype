// AI Relationship Manager Chat Application with Real API Integration
class AIRelationshipManager {
    constructor() {
        // Load API configuration from external config file
        this.loadApiConfiguration();
        
        this.conversationHistory = [];
        this.customerData = null;
        this.systemPrompt = null;
        this.isTyping = false;
        this.conversationStarted = false;
        this.apiTested = true; // Assume API is working since we have the key
        this.init();
    }

    async loadApiConfiguration() {
        try {
            // Try to load from API endpoint (Vercel)
            const response = await fetch('/api/config');
            if (response.ok) {
                const config = await response.json();
                this.apiKeys = {
                    openai: config.openai,
                    sonar: config.sonar
                };
                this.apiProvider = config.provider || 'openai';
                console.log('✅ Configuration loaded from API');
            } else {
                throw new Error('API config not available');
            }
        } catch (error) {
            // Fallback to window config or placeholder values
            if (window.API_CONFIG) {
                this.apiKeys = {
                    openai: window.API_CONFIG.openai,
                    sonar: window.API_CONFIG.sonar
                };
                this.apiProvider = window.API_CONFIG.provider || 'openai';
                console.log('✅ Configuration loaded from window.API_CONFIG');
            } else {
                // Fallback to placeholder values (for GitHub demo)
                console.warn('⚠️ API_CONFIG not found. Using placeholder values. Please create config.js with your actual API keys.');
                this.apiKeys = {
                    openai: 'sk-your-openai-api-key-here',
                    sonar: 'pplx-your-perplexity-api-key-here'
                };
                this.apiProvider = 'openai';
                
                // Show helpful message to user
                this.showApiKeyMessage();
            }
        }
        
        this.apiKey = this.apiKeys[this.apiProvider];
        this.apiTested = true; // Assume API is working since we have the key
    }

    async init() {
        await this.loadApiConfiguration();
        this.loadCustomerData();
        this.setupEventListeners();
        // Skip setup screen and go directly to chat
        this.startChatDirectly();
    }

    loadCustomerData() {
        // Customer data from provided JSON
        this.customerData = {
            name: "Budi Santoso",
            age: 35,
            occupation: "Software Engineer", 
            location: "Jakarta, Indonesia",
            income_monthly: 25000000,
            marital_status: "Married",
            dependents: 2,
            current_products: [
                {
                    product: "Savings Account",
                    balance: 85000000,
                    account_number: "****3421"
                },
                {
                    product: "Credit Card", 
                    limit: 50000000,
                    utilization: 15,
                    account_number: "****8765"
                },
                {
                    product: "Time Deposit",
                    amount: 100000000,
                    maturity_date: "2025-01-15",
                    account_number: "****5432"
                }
            ],
            financial_goals: [
                {
                    goal: "Home Purchase",
                    target_amount: 800000000,
                    timeline: "2026-06-01",
                    progress: 35
                },
                {
                    goal: "Children Education", 
                    target_amount: 500000000,
                    timeline: "2030-01-01",
                    progress: 15
                }
            ],
            transaction_patterns: {
                avg_monthly_spending: 18000000,
                categories: ["Groceries", "Transportation", "Restaurants", "Utilities", "Shopping"],
                recent_activities: [
                    "High dining spending: IDR 3,500,000",
                    "Salary credited: IDR 25,000,000", 
                    "Investment transfer: IDR 10,000,000"
                ]
            },
            risk_profile: "Moderate",
            communication_preference: "WhatsApp"
        };

        this.bankProducts = [
            {
                name: "Home Loan",
                type: "Loan",
                interest_rate: "7.5% - 9.5%", 
                features: ["Pre-approval available", "Up to 80% financing", "Flexible repayment"],
                eligibility: "Minimum income IDR 10M"
            },
            {
                name: "Balanced Portfolio Fund",
                type: "Investment",
                returns: "8.5% average",
                risk: "Moderate",
                features: ["Professional management", "Diversified portfolio", "Liquid investment"],
                minimum: "IDR 10,000,000"
            },
            {
                name: "Term Life Insurance", 
                type: "Insurance",
                coverage: "Up to IDR 500M",
                premium: "IDR 850,000/month",
                features: ["Family protection", "Tax benefits", "Affordable premiums"],
                eligibility: "Age 18-65"
            },
            {
                name: "Education Insurance",
                type: "Insurance", 
                coverage: "Guaranteed education funds",
                features: ["Inflation protection", "Double benefit", "Flexible premiums"],
                minimum: "IDR 500,000/month"
            }
        ];

        this.systemPrompt = `You are an AI Relationship Manager for DanamonBank in Indonesia. You have access to customer profile data and should act as a professional, friendly banking advisor. Your role is to:

1) Understand customer needs through conversation
2) Recommend relevant banking products 
3) Explain product features and benefits
4) Handle objections and concerns
5) Provide personalized financial advice

Always use the customer's name (Budi/Pak Budi) and reference their actual data when making recommendations. Speak in a professional but warm tone, and always aim to help the customer achieve their financial goals. Use Indonesian Rupiah (IDR) for all amounts and be culturally appropriate for Indonesian banking customers.

Customer Profile: ${JSON.stringify(this.customerData, null, 2)}
Available Bank Products: ${JSON.stringify(this.bankProducts, null, 2)}`;
    }

    setupEventListeners() {
        // Chat functionality
        const sendButton = document.getElementById('sendButton');
        const messageInput = document.getElementById('messageInput');

        if (sendButton) {
            sendButton.addEventListener('click', () => this.handleSendMessage());
        }
        
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSendMessage();
                }
            });
        }

        // Header buttons - only reset functionality
        const resetBtn = document.getElementById('resetBtn');

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetSession());
        }
    }



    async startChatDirectly() {
        console.log('Starting chat with provider:', this.apiProvider);

        // Store API credentials in session storage
        sessionStorage.setItem('ai_rm_provider', this.apiProvider);
        sessionStorage.setItem('ai_rm_key', this.apiKey);

        // Switch to chat interface
        const setupScreen = document.getElementById('setupScreen');
        const chatApp = document.getElementById('chatApp');
        
        if (setupScreen) setupScreen.classList.add('hidden');
        if (chatApp) chatApp.classList.remove('hidden');

        // Update chat status
        const providerNames = {
            'openai': 'OpenAI',
            'sonar': 'Sonar Pro'
        };
        
        const chatStatus = document.getElementById('chatStatus');
        if (chatStatus) {
            chatStatus.textContent = `Online`;
        }

        // Enable input
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        
        if (messageInput) messageInput.disabled = false;
        if (sendButton) sendButton.disabled = false;

        // Start initial conversation
        await this.delay(2000);
        await this.startInitialConversation();
    }



    showApiKeyMessage() {
        // Show a helpful message when API keys are not configured
        const messagesContainer = document.getElementById('messagesContainer');
        if (messagesContainer) {
            messagesContainer.innerHTML = `
                <div class="api-key-notice">
                    <div class="notice-icon">🔑</div>
                    <h2>API Key Required</h2>
                    <p>This is a demo version. To use the AI features, you need to:</p>
                    <ol>
                        <li>Clone this repository locally</li>
                        <li>Create a <code>config.js</code> file with your API keys</li>
                        <li>Run the app locally</li>
                    </ol>
                    <p><strong>Get API Keys:</strong></p>
                    <ul>
                        <li><a href="https://platform.openai.com/api-keys" target="_blank">OpenAI API Key</a></li>
                        <li><a href="https://www.perplexity.ai/settings/api" target="_blank">Perplexity API Key</a></li>
                    </ul>
                    <p><em>For production deployment, consider using Netlify or Vercel with environment variables.</em></p>
                </div>
            `;
        }
    }

    async startInitialConversation() {
        if (this.conversationStarted) return;
        this.conversationStarted = true;

        // Clear welcome banner
        this.clearWelcomeBanner();

        // Start with personalized greeting
        await this.delay(1000);
        await this.sendAIMessage("Hello Pak Budi! I hope you're having a great day. I'm your personal AI relationship manager from DanamonBank, and I'm excited to help you with your financial goals. I've been reviewing your profile and I can see you're making excellent progress with your savings and financial planning! 🎯");

        await this.delay(1500);
        await this.sendAIMessage("I noticed you have some exciting opportunities coming up - you're 35% towards your home purchase goal and have been very disciplined with your finances. Would you like me to share some personalized recommendations that could help accelerate your goals?");
    }

    clearWelcomeBanner() {
        const messagesContainer = document.getElementById('messagesContainer');
        if (messagesContainer) {
            messagesContainer.innerHTML = '';
        }
    }

    async sendAIMessage(content) {
        // Add to conversation history
        this.conversationHistory.push({
            role: 'assistant',
            content: content
        });

        // Show in UI
        await this.addAIMessage(content);
    }

    async handleSendMessage() {
        const messageInput = document.getElementById('messageInput');
        if (!messageInput) return;
        
        const message = messageInput.value.trim();
        
        if (!message || this.isTyping) return;
        
        // Add user message to UI and history
        this.addUserMessage(message);
        this.conversationHistory.push({
            role: 'user', 
            content: message
        });
        
        messageInput.value = '';
        
        // Get AI response
        await this.getAIResponse();
    }

    async getAIResponse() {
        try {
            this.showTypingIndicator();
            
            // Prepare messages for API call
            const messages = [
                { role: 'system', content: this.systemPrompt },
                ...this.conversationHistory
            ];

            let response;
            if (this.apiProvider === 'openai') {
                response = await this.callOpenAI(messages);
            } else if (this.apiProvider === 'sonar') {
                response = await this.callSonarPro(messages);
            }

            if (response) {
                await this.delay(1000); // Simulate thinking time
                await this.sendAIMessage(response);
            } else {
                await this.sendAIMessage("I apologize, but I'm having trouble processing your request right now. Could you please try again?");
            }

        } catch (error) {
            console.error('Error getting AI response:', error);
            await this.sendAIMessage("I'm experiencing some technical difficulties. Please check your API key and try again, or contact support if the issue persists.");
        } finally {
            this.hideTypingIndicator();
        }
    }

    async callOpenAI(messages) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: messages,
                    max_tokens: 1000,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error(`OpenAI API error: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0]?.message?.content;
        } catch (error) {
            console.error('OpenAI API error:', error);
            throw error;
        }
    }

    async callSonarPro(messages) {
        try {
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.1-sonar-large-128k-online',
                    messages: messages,
                    max_tokens: 1000,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error(`Sonar Pro API error: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0]?.message?.content;
        } catch (error) {
            console.error('Sonar Pro API error:', error);
            throw error;
        }
    }

    showTypingIndicator() {
        if (this.isTyping) return;
        this.isTyping = true;
        
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.classList.remove('hidden');
            this.scrollToBottom();
        }
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.classList.add('hidden');
        }
    }

    async addAIMessage(text) {
        this.hideTypingIndicator();
        
        const messagesContainer = document.getElementById('messagesContainer');
        if (!messagesContainer) return;
        
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-wrapper ai';
        messageWrapper.innerHTML = `
            <div class="message-bubble ai">
                <p>${this.formatMessage(text)}</p>
            </div>
        `;
        
        messagesContainer.appendChild(messageWrapper);
        this.scrollToBottom();
        
        await this.delay(300);
    }

    addUserMessage(text) {
        const messagesContainer = document.getElementById('messagesContainer');
        if (!messagesContainer) return;
        
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-wrapper user';
        messageWrapper.innerHTML = `
            <div class="message-bubble user">
                <p>${this.formatMessage(text)}</p>
            </div>
        `;
        
        messagesContainer.appendChild(messageWrapper);
        this.scrollToBottom();
    }

    formatMessage(text) {
        // Basic formatting for currency and emphasis
        return text
            .replace(/IDR\s*([\d,]+(?:,\d{3})*(?:\.\d{2})?)/g, '<strong>IDR $1</strong>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('messagesContainer');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }



    resetSession() {
        if (confirm('Are you sure you want to reset your session? This will clear all conversation history.')) {
            // Clear session storage
            sessionStorage.removeItem('ai_rm_provider');
            sessionStorage.removeItem('ai_rm_key');
            
            // Reset application state
            this.conversationHistory = [];
            this.conversationStarted = false;
            
            // Clear messages container
            const messagesContainer = document.getElementById('messagesContainer');
            if (messagesContainer) {
                messagesContainer.innerHTML = '';
            }
            
            // Restart the conversation
            this.startInitialConversation();
        }
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application
let aiRM;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Starting AI Relationship Manager Chat with Real API Integration...');
    aiRM = new AIRelationshipManager();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        console.log('✅ Chat application ready!');
    }, 100);


});

// Security: Clear session storage on page unload (optional)
window.addEventListener('beforeunload', () => {
    // Comment out to persist session across page refreshes
    // sessionStorage.removeItem('ai_rm_provider');
    // sessionStorage.removeItem('ai_rm_key');
});
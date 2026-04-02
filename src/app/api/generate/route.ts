import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { companyType, dataCollected, usersGeography, thirdParties } = await req.json();

  const prompt = `You are a privacy law specialist. Generate comprehensive privacy documentation for a company:

**Company Type:** ${companyType}
**Data Collected:** ${dataCollected}
**Users Geography:** ${usersGeography}
**Third-Party Services:** ${thirdParties}

Please provide:

1. **Privacy Policy** — Full consumer-facing privacy policy including:
   - Data Controller identification
   - Categories of personal data collected
   - Purposes of processing (legal basis)
   - Data retention periods
   - User rights (access, deletion, portability, objection)
   - Children's privacy (COPPA compliance)
   - International data transfers (SCCs/Guarantees)
   - Contact information for DPO/privacy inquiries
   - Policy effective date and update cadence

2. **Data Processing Agreement (DPA)** — B2B processor agreement covering:
   - Processor and Controller roles
   - Processing instructions and scope
   - Data security measures (technical & organizational)
   - Sub-processor management
   - Data breach notification procedures and timelines
   - Audit rights
   - Return/delete obligations

3. **Cookie Policy** — Cookie consent and usage policy:
   - Cookie categories (essential, functional, analytics, marketing)
   - Specific cookies used
   - Cookie consent mechanism
   - Opt-out instructions
   - Cookie retention periods

4. **CCPA Notices** — California Consumer Privacy Act:
   - "Do Not Sell/Share My Personal Information" notice
   - Categories of data sold/shared (if applicable)
   - Financial incentives disclosure

5. **GDPR Notices** — EU/UK GDPR:
   - Data subject rights summary
   - Lawful basis table
   - DPO contact (if applicable)
   - Supervisory authority information

Format with clear headers. Use placeholders like [COMPANY NAME], [DPO EMAIL], etc.`;

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 4500,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "No output received.";
    return NextResponse.json({ result: content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

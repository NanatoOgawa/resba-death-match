import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server";

// ユーザーから提供されたAPIキーを使用
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// 判定用のスキーマ定義
const judgmentSchema = {
  description: "Battle judgment result",
  type: SchemaType.OBJECT,
  properties: {
    result: {
      type: SchemaType.STRING,
      enum: ["WIN", "LOSE", "DRAW"],
      description: "Final result of the battle",
    },
    score_logic: {
      type: SchemaType.NUMBER,
      description: "Score for logical strength (0-100)",
    },
    score_aori: {
      type: SchemaType.NUMBER,
      description: "Score for provocation/sarcasm (0-100)",
    },
    score_margin: {
      type: SchemaType.NUMBER,
      description: "Score for emotional composure (0-100)",
    },
    judge_comment: {
      type: SchemaType.STRING,
      description: "Concise, sharp, and funny comment from the AI judge",
    },
  },
  required: ["result", "score_logic", "score_aori", "score_margin", "judge_comment"],
};

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing in environment");
      return NextResponse.json({ error: "API Key Missing" }, { status: 500 });
    }

    const { action, userPost, enemyPost, userCounter } = await req.json();

    if (action === "generate_kuso") {
      // クォータが利用可能な 'gemini-flash-latest' (Gemini 3 Flash) を使用
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      const prompt = `
        あなたはネット上の「クソリプラー」です。
        以下のユーザーの投稿に対して、非常に不快で、揚げ足取りで、皮肉たっぷりな「クソリプ」を1つ生成してください。
        
        【ユーザーの投稿】
        ${userPost}
        
        【条件】
        - 100文字以内
        - 丁寧語は使わず、馴れ馴れしいか、見下したような口調
        - 文末にうざい絵文字（😅, 😂, 🤔, ✋等）を1つ以上入れる
        - 論理的である必要はなく、感情を逆撫ですることを優先
      `;

      const result = await model.generateContent(prompt);
      const kusoReply = result.response.text().trim();
      return NextResponse.json({ enemyPost: kusoReply });
    }

    if (action === "judge") {
      // クォータが利用可能な 'gemini-2.5-flash' を使用
      // スキーマ出力により、構造化された判定を確実に取得
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: judgmentSchema,
        }
      });

      const prompt = `
        ネットレスバ（口論）の審判として、以下のやり取りを厳正かつ「ネット掲示板の毒舌管理人」のような視点で審査してください。
        
        【敵のクソリプ（前提）】
        ${enemyPost}
        
        【ユーザーの反撃（カウンター）】
        ${userCounter}
        
        【審査要件】
        1. LOGIC: 相手の矛盾を突いているか、論理的に優位か。
        2. ROAST: 相手をどれだけ的な煽り、ダメージを与えたか。
        3. MARGIN: 余裕を感じさせる、スマートな返しができているか。
        
        【判定ルール】
        - ユーザーが論理的かつ綺麗に言い返している場合は「WIN」
        - ユーザーが論理破綻していたり、単に感情的になっている場合は「LOSE」
        - 両者低レベル、あるいは甲乙つけがたい場合は「DRAW」
      `;

      const result = await model.generateContent(prompt);
      const judgment = JSON.parse(result.response.text());
      return NextResponse.json(judgment);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Gemini AI Error:", error);
    return NextResponse.json({ 
      error: "AI連携エラー", 
      details: error.message,
      status: error.status
    }, { status: 500 });
  }
}

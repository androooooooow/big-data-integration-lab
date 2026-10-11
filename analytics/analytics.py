import pandas as pd
import os

input_file = "../output/analytics_ready.json"
output_file = "../output/analytics_ready.parquet"

# ==========================================
# LOAD JSON
# ==========================================

df = pd.read_json(input_file)

print("\n===== ANALYTICS DATA =====")
print(df)

# ==========================================
# BASIC ANALYTICS
# ==========================================

print("\n===== SUMMARY =====")

print("Number of transactions:", len(df))
print("Total amount:", df["amount"].sum())
print("Total tax:", df["tax_amount"].sum())
print("Total value:", df["total_value"].sum())
print("Average transaction:", df["amount"].mean())

# ==========================================
# CURRENCY ANALYSIS
# ==========================================

print("\n===== CURRENCY ANALYSIS =====")

summary = (
    df.groupby("currency")
    .agg(
        transactions=("transaction_id", "count"),
        total_amount=("amount", "sum"),
        average_amount=("amount", "mean"),
    )
)

print(summary)

# ==========================================
# PARQUET
# ==========================================

df.to_parquet(output_file, index=False)

print("\nParquet file created:")
print(output_file)